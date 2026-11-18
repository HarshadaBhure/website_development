export default function SummaryCards({ summary }) {
  const cards = [
    {
      label: 'Platform Total (Oct)',
      value: `₹${(summary.platformTotal / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
      sub: `${summary.totalTransactions} records (${summary.uniqueTransactions} unique)`,
      icon: '🏦',
      color: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/30',
      textColor: 'text-indigo-300',
    },
    {
      label: 'Bank Settled (Oct)',
      value: `₹${(summary.bankTotal / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
      sub: `${summary.totalSettlements} settlement batches`,
      icon: '🏛️',
      color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30',
      textColor: 'text-emerald-300',
    },
    {
      label: 'Net Difference',
      value: `₹${(Math.abs(summary.difference) / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
      sub: summary.difference > 0 ? 'Platform > Bank' : summary.difference < 0 ? 'Bank > Platform' : 'Balanced',
      icon: summary.difference !== 0 ? '⚠️' : '✅',
      color: summary.difference !== 0
        ? 'from-red-500/20 to-red-600/10 border-red-500/30'
        : 'from-green-500/20 to-green-600/10 border-green-500/30',
      textColor: summary.difference !== 0 ? 'text-red-300' : 'text-green-300',
    },
    {
      label: 'Gaps Detected',
      value: summary.gapCount,
      sub: `₹${(summary.totalGapAmount / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })} total exposure`,
      icon: '🔍',
      color: 'from-amber-500/20 to-amber-600/10 border-amber-500/30',
      textColor: 'text-amber-300',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, sub, icon, color, textColor }) => (
        <div
          key={label}
          className={`rounded-2xl bg-gradient-to-br ${color} border p-5 backdrop-blur-sm hover:scale-[1.02] transition-transform duration-200`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</span>
            <span className="text-xl">{icon}</span>
          </div>
          <div className={`text-2xl font-bold ${textColor} mb-1`}>{value}</div>
          <div className="text-xs text-slate-500">{sub}</div>
        </div>
      ))}
    </div>
  );
}
