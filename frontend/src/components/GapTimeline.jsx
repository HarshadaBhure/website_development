import { useMemo } from 'react';

const GAP_COLORS = {
  'GAP-1': { bg: 'bg-amber-500',  border: 'border-amber-500', text: 'text-amber-300',  light: 'bg-amber-500/10' },
  'GAP-2': { bg: 'bg-blue-500',   border: 'border-blue-500',  text: 'text-blue-300',   light: 'bg-blue-500/10' },
  'GAP-3': { bg: 'bg-red-500',    border: 'border-red-500',   text: 'text-red-300',    light: 'bg-red-500/10' },
  'GAP-4': { bg: 'bg-purple-500', border: 'border-purple-500',text: 'text-purple-300', light: 'bg-purple-500/10' },
  'GAP-X': { bg: 'bg-orange-500', border: 'border-orange-500',text: 'text-orange-300', light: 'bg-orange-500/10' },
};

export default function GapTimeline({ transactions, settlements, gaps }) {
  // Build timeline events
  const events = useMemo(() => {
    const all = [];

    // All transactions
    transactions.forEach(txn => {
      const gap = gaps.find(g => g.txnId === txn.txnId);
      all.push({
        date: txn.date,
        type: 'transaction',
        id: txn.txnId,
        amount: txn.amount,
        txnType: txn.type,
        gap,
        label: `TXN: ${txn.txnId}`,
      });
    });

    // All settlements
    settlements.forEach(set => {
      const gap = gaps.find(g => g.txnId === set.setId);
      all.push({
        date: set.settlementDate,
        type: 'settlement',
        id: set.setId,
        amount: set.amount,
        txnIds: set.txnIds,
        gap,
        label: `SET: ${set.setId}`,
        note: set.note,
      });
    });

    return all.sort((a, b) => a.date.localeCompare(b.date));
  }, [transactions, settlements, gaps]);

  // Group by date
  const byDate = useMemo(() => {
    const map = {};
    events.forEach(e => {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    });
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  }, [events]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-white">Timeline View</h2>
        <p className="text-sm text-slate-400">Transactions & settlements plotted chronologically with gap markers</p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="w-3 h-3 rounded bg-indigo-500" /> Transaction
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="w-3 h-3 rounded bg-emerald-500" /> Settlement (Oct)
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="w-3 h-3 rounded bg-amber-500" /> Settlement (Nov — GAP-1)
        </div>
        {Object.entries(GAP_COLORS).map(([type, c]) => (
          <div key={type} className="flex items-center gap-2 text-xs text-slate-400">
            <div className={`w-3 h-3 rounded ${c.bg}`} /> {type}
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-1">
        {byDate.map(([date, dayEvents]) => (
          <div key={date} className="flex gap-4 group">
            {/* Date column */}
            <div className="w-28 shrink-0 pt-2.5 text-right">
              <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">{date}</span>
            </div>

            {/* Line */}
            <div className="flex flex-col items-center">
              <div className="w-px flex-1 bg-white/10 group-hover:bg-indigo-500/50 transition-colors" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-600 my-0.5 group-hover:bg-indigo-500 transition-colors" />
              <div className="w-px flex-1 bg-white/10 group-hover:bg-indigo-500/50 transition-colors" />
            </div>

            {/* Events */}
            <div className="flex-1 pb-3 pt-1 flex flex-wrap gap-2">
              {dayEvents.map((ev, i) => {
                const isNov = ev.date.startsWith('2024-11');
                const gapColor = ev.gap ? GAP_COLORS[ev.gap.type] : null;

                return (
                  <div
                    key={`${ev.id}-${i}`}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all hover:scale-105 cursor-default ${
                      gapColor
                        ? `${gapColor.light} ${gapColor.border} ${gapColor.text}`
                        : ev.type === 'transaction'
                          ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
                          : isNov
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    }`}
                    title={ev.gap?.detail || ev.label}
                  >
                    <span className="font-medium">
                      {ev.type === 'transaction' ? '💳' : '🏦'}
                    </span>
                    <span className="font-mono">{ev.id.split('-').slice(-1)[0]}</span>
                    <span className="font-semibold">
                      {ev.amount < 0 ? '-' : ''}₹{(Math.abs(ev.amount) / 100).toLocaleString('en-IN', { minimumFractionDigits: 0 })}
                    </span>
                    {ev.gap && (
                      <span className={`font-bold ${gapColor?.text}`}>[{ev.gap.type}]</span>
                    )}
                    {ev.note && ev.note.includes('⚠️') && !ev.gap && (
                      <span className="text-amber-400">⚠️</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
