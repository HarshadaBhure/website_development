import { useState } from 'react';

export default function TransactionTable({ transactions, gaps }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');

  const flaggedIds = new Set(gaps.map(g => g.txnId));
  const dupIds = new Set(
    transactions.map(t => t.txnId).filter((id, i, arr) => arr.indexOf(id) !== i)
  );

  const filtered = transactions.filter(txn => {
    const matchSearch = !search || txn.txnId.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === 'ALL'      ? true :
      filter === 'FLAGGED'  ? flaggedIds.has(txn.txnId) || dupIds.has(txn.txnId) :
      filter === 'REFUND'   ? txn.type === 'refund' :
      filter === 'DUPLICATE'? dupIds.has(txn.txnId) : true;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Platform Transactions</h2>
          <p className="text-sm text-slate-400">{transactions.length} records · October 2024</p>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search TXN ID…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48"
          />
          {['ALL', 'FLAGGED', 'REFUND', 'DUPLICATE'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                filter === f ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-3 text-left">#</th>
                <th className="px-6 py-3 text-left">Transaction ID</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-right">Amount (₹)</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Flag</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((txn, idx) => {
                const isDup     = dupIds.has(txn.txnId);
                const isFlagged = flaggedIds.has(txn.txnId);
                const isRefund  = txn.type === 'refund';
                const rowClass  = isDup     ? 'bg-red-500/5 border-red-500/20' :
                                  isFlagged ? 'bg-amber-500/5 border-amber-500/10' : '';

                return (
                  <tr key={`${txn.txnId}-${idx}`} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${rowClass}`}>
                    <td className="px-6 py-3 text-slate-600 text-xs">{idx + 1}</td>
                    <td className="px-6 py-3">
                      <code className="text-xs text-slate-300 bg-white/5 px-2 py-0.5 rounded">
                        {txn.txnId}
                      </code>
                      {isDup && (
                        <span className="ml-2 text-xs bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded border border-red-500/30">DUP</span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-slate-400 text-xs">{txn.date}</td>
                    <td className="px-6 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${
                        isRefund
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                          : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                      }`}>
                        {txn.type}
                      </span>
                    </td>
                    <td className={`px-6 py-3 text-right font-mono font-semibold text-sm ${
                      txn.amount < 0 ? 'text-purple-400' : 'text-emerald-400'
                    }`}>
                      {txn.amount < 0 ? '-' : ''}₹{(Math.abs(txn.amount) / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${
                        txn.status === 'settled'
                          ? 'bg-green-500/20 text-green-300 border-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                      }`}>
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-xs text-slate-500">
                      {txn.note || '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-white/5 text-xs text-slate-500">
          Showing {filtered.length} of {transactions.length} transactions
        </div>
      </div>
    </div>
  );
}
