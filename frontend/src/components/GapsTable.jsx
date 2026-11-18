const GAP_META = {
  'GAP-1': { label: 'Cross-Month Settlement', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40', dot: 'bg-amber-400' },
  'GAP-2': { label: 'Rounding Discrepancy',   color: 'bg-blue-500/20 text-blue-300 border-blue-500/40',   dot: 'bg-blue-400' },
  'GAP-3': { label: 'Duplicate Entry',         color: 'bg-red-500/20 text-red-300 border-red-500/40',      dot: 'bg-red-400' },
  'GAP-4': { label: 'Orphaned Refund',         color: 'bg-purple-500/20 text-purple-300 border-purple-500/40', dot: 'bg-purple-400' },
  'GAP-X': { label: 'Amount Mismatch',         color: 'bg-orange-500/20 text-orange-300 border-orange-500/40', dot: 'bg-orange-400' },
};

const SEV_META = {
  high:   'bg-red-500/20 text-red-300 border-red-500/40',
  medium: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  low:    'bg-green-500/20 text-green-300 border-green-500/40',
};

export default function GapsTable({ gaps, mini = false }) {
  if (!gaps || gaps.length === 0) {
    return (
      <div className="rounded-2xl bg-white/5 border border-white/10 p-12 text-center">
        <div className="text-4xl mb-3">✅</div>
        <div className="text-slate-300 font-medium">No gaps found for this filter</div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden backdrop-blur-sm">
      {!mini && (
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="font-semibold text-white">Reconciliation Gaps — {gaps.length} issue{gaps.length !== 1 ? 's' : ''}</h3>
        </div>
      )}
      {mini && (
        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
          <h3 className="font-semibold text-white">Recent Gaps</h3>
          <span className="text-xs text-slate-400">Showing top 5</span>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-xs text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">Severity</th>
              <th className="px-6 py-3 text-left">ID / Batch</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Financial Impact</th>
              <th className="px-6 py-3 text-left">Detail</th>
            </tr>
          </thead>
          <tbody>
            {gaps.map((gap, idx) => {
              const meta = GAP_META[gap.type] || GAP_META['GAP-X'];
              return (
                <tr
                  key={`${gap.txnId}-${idx}`}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${meta.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                      {gap.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-md text-xs font-semibold border ${SEV_META[gap.severity]}`}>
                      {gap.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-xs text-slate-300 bg-white/5 px-2 py-0.5 rounded">{gap.txnId}</code>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs">{gap.date}</td>
                  <td className="px-6 py-4">
                    <span className={`font-mono font-semibold text-sm ${gap.impact < 0 ? 'text-purple-400' : 'text-red-400'}`}>
                      {gap.impact < 0 ? '-' : ''}₹{(Math.abs(gap.impact) / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs max-w-xs">{gap.detail}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
