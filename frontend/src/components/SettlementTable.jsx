export default function SettlementTable({ settlements, gaps }) {
  const gapBatches = new Set(gaps.map(g => g.txnId));

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-white">Bank Settlements</h2>
        <p className="text-sm text-slate-400">{settlements.length} batches · showing all months</p>
      </div>

      <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-3 text-left">#</th>
                <th className="px-6 py-3 text-left">Settlement ID</th>
                <th className="px-6 py-3 text-left">Settlement Date</th>
                <th className="px-6 py-3 text-left">Transactions Covered</th>
                <th className="px-6 py-3 text-right">Bank Amount (₹)</th>
                <th className="px-6 py-3 text-left">Month</th>
                <th className="px-6 py-3 text-left">Flag</th>
              </tr>
            </thead>
            <tbody>
              {settlements.map((set, idx) => {
                const isNovember = set.settlementDate.startsWith('2024-11');
                const isFlagged  = gapBatches.has(set.setId) || (set.note && set.note.includes('⚠️'));
                const rowClass   = isNovember ? 'bg-amber-500/5' : isFlagged ? 'bg-red-500/5' : '';

                return (
                  <tr key={set.setId} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${rowClass}`}>
                    <td className="px-6 py-3 text-slate-600 text-xs">{idx + 1}</td>
                    <td className="px-6 py-3">
                      <code className="text-xs text-slate-300 bg-white/5 px-2 py-0.5 rounded">{set.setId}</code>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`text-xs font-medium ${isNovember ? 'text-amber-400' : 'text-slate-300'}`}>
                        {set.settlementDate}
                        {isNovember && <span className="ml-2 text-amber-500">📅 Nov</span>}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex flex-wrap gap-1">
                        {set.txnIds.map(id => (
                          <code key={id} className="text-xs text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">
                            {id.split('-').slice(-1)[0]}
                          </code>
                        ))}
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">{set.txnIds.length} txn{set.txnIds.length !== 1 ? 's' : ''}</div>
                    </td>
                    <td className={`px-6 py-3 text-right font-mono font-semibold text-sm ${
                      set.amount < 0 ? 'text-purple-400' : 'text-emerald-400'
                    }`}>
                      {set.amount < 0 ? '-' : ''}₹{(Math.abs(set.amount) / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${
                        isNovember
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          : 'bg-slate-500/20 text-slate-300 border-slate-500/30'
                      }`}>
                        {set.settlementDate.substring(0, 7)}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-xs text-slate-500">
                      {set.note || '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
