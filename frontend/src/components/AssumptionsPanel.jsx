const ASSUMPTIONS = [
  {
    id: 'A1',
    category: 'Currency & Precision',
    text: 'All amounts are stored in paise (1/100 of INR, integer) to avoid floating-point arithmetic errors. Display values are divided by 100.',
    impact: 'Prevents the class of bugs where 0.1 + 0.2 ≠ 0.3. Despite this, we deliberately plant a rounding gap to show how bank FX rounding can still cause 1-paise discrepancies when summed.',
    color: 'border-indigo-500/40 bg-indigo-500/5',
  },
  {
    id: 'A2',
    category: 'Settlement Window',
    text: 'The bank settles transactions 1–2 business days after the transaction date. Transactions at month-end (e.g., Oct 31) may therefore settle in the following month.',
    impact: 'Creates timing gaps in month-end reconciliation. Revenue booked in October may appear in the bank statement in November.',
    color: 'border-amber-500/40 bg-amber-500/5',
  },
  {
    id: 'A3',
    category: 'Batch Settlement',
    text: 'The bank sends a single net amount per batch, covering multiple transactions. The platform records individual transactions.',
    impact: 'Matching requires summing platform transactions per batch and comparing to the single bank batch amount. Rounding differences surface only at the batch level.',
    color: 'border-emerald-500/40 bg-emerald-500/5',
  },
  {
    id: 'A4',
    category: 'Refunds',
    text: 'A refund is a negative transaction that must reference an original transaction ID (originalTxnId). The original must exist in the platform ledger for the books to balance.',
    impact: 'An orphaned refund (original not found) means money left the account without a matching debit entry — a fraud or data integrity risk.',
    color: 'border-purple-500/40 bg-purple-500/5',
  },
  {
    id: 'A5',
    category: 'Duplicate Detection',
    text: 'Duplicate entries are identified by repeated transaction IDs in the platform ledger. The bank always deduplicates and settles each unique transaction exactly once.',
    impact: 'A duplicate in the platform ledger inflates reported revenue. The platform thinks it processed ₹X twice; the bank only paid ₹X once — net gap = ₹X.',
    color: 'border-red-500/40 bg-red-500/5',
  },
  {
    id: 'A6',
    category: 'Month Scope',
    text: 'Reconciliation scope is October 2024. Bank settlements are filtered to October for the platform-vs-bank comparison. November settlements are flagged as out-of-scope.',
    impact: 'Cross-month settlements are not "wrong" — they will reconcile next month. However they must be tracked to avoid double-counting.',
    color: 'border-blue-500/40 bg-blue-500/5',
  },
  {
    id: 'A7',
    category: 'No Partial Settlements',
    text: 'Each transaction is either fully settled or pending. There are no partial settlements in this model.',
    impact: 'Simplification. In production, partial settlements (e.g., chargeback holdbacks) are common and add another reconciliation category.',
    color: 'border-slate-500/40 bg-slate-500/5',
  },
];

const GAP_EXPLANATIONS = [
  {
    id: 'GAP-1',
    label: 'Cross-Month Settlement',
    icon: '📅',
    color: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    howPlanted: 'Oct 31 transaction with settlement date Nov 2.',
    whyItMatters: 'Platform counts it as October revenue. Bank\'s October statement is short by this amount. The gap reverses in November — but someone has to reconcile it manually.',
    productionRisk: 'Affects every month-end for companies with high transaction volume near cutoff dates.',
  },
  {
    id: 'GAP-2',
    label: 'Rounding Discrepancy',
    icon: '🔢',
    color: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
    howPlanted: 'Three transactions summing to ₹X; bank settles ₹X − ₹0.01 (1 paise short).',
    whyItMatters: 'Individually each transaction matches. The difference only appears when summed. 1 paise × 10,000 batches/month = ₹100 unexplained.',
    productionRisk: 'FX conversion, tax rounding, and fee calculations all introduce sub-paise values that accumulate.',
  },
  {
    id: 'GAP-3',
    label: 'Duplicate Entry',
    icon: '🔁',
    color: 'bg-red-500/10 border-red-500/30 text-red-300',
    howPlanted: 'Same TXN ID inserted twice in the platform ledger; bank settled it once.',
    whyItMatters: 'Platform shows 2× the amount; bank shows 1×. The difference equals the full transaction amount. High fraud/error risk.',
    productionRisk: 'Data pipeline retries, message queue at-least-once delivery, and ETL bugs are common causes.',
  },
  {
    id: 'GAP-4',
    label: 'Orphaned Refund',
    icon: '♻️',
    color: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
    howPlanted: 'Refund referencing TXN-20241001-9999 which does not exist in the ledger.',
    whyItMatters: 'Money left the platform without a matching original transaction. Books are unbalanced and there is no audit trail for the debit.',
    productionRisk: 'Cross-system refunds (e.g., manual ops override, migrated data) or deleted transactions can create orphaned refunds.',
  },
];

export default function AssumptionsPanel() {
  return (
    <div className="space-y-10">

      {/* Assumptions */}
      <div>
        <h2 className="text-xl font-bold text-white mb-2">Stated Assumptions</h2>
        <p className="text-sm text-slate-400 mb-6">
          All assumptions are explicit. These are not excuses — they are the rules of the model. Each one could be relaxed in production.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ASSUMPTIONS.map(a => (
            <div key={a.id} className={`rounded-2xl border p-5 ${a.color}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-slate-500 bg-white/10 px-2 py-0.5 rounded">{a.id}</span>
                <span className="text-sm font-semibold text-white">{a.category}</span>
              </div>
              <p className="text-sm text-slate-300 mb-3">{a.text}</p>
              <div className="text-xs text-slate-400 border-t border-white/10 pt-3">
                <span className="font-medium text-slate-300">Impact: </span>{a.impact}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gap explanations */}
      <div>
        <h2 className="text-xl font-bold text-white mb-2">Planted Gap Explanations</h2>
        <p className="text-sm text-slate-400 mb-6">
          Each gap was deliberately planted to test the reconciliation engine's detection capability.
        </p>
        <div className="space-y-4">
          {GAP_EXPLANATIONS.map(g => (
            <div key={g.id} className={`rounded-2xl border p-6 ${g.color}`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{g.icon}</span>
                <div>
                  <span className="text-xs font-bold bg-white/10 px-2 py-0.5 rounded mr-2">{g.id}</span>
                  <span className="font-semibold text-white">{g.label}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">How planted</div>
                  <p className="text-slate-300">{g.howPlanted}</p>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Why it matters</div>
                  <p className="text-slate-300">{g.whyItMatters}</p>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Production risk</div>
                  <p className="text-slate-300">{g.productionRisk}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Production gaps */}
      <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-6">
        <h2 className="text-lg font-bold text-white mb-3">⚠️ What This Would Get Wrong in Production</h2>
        <ol className="space-y-3 text-sm text-slate-300">
          <li className="flex gap-3">
            <span className="text-orange-400 font-bold shrink-0">1.</span>
            <span><strong className="text-white">Multi-currency transactions</strong> — This model assumes INR only. Cross-border payments involve FX rates that change between transaction time and settlement time. The rounding differences would be orders of magnitude larger and legitimately explainable — but hard to auto-match.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-orange-400 font-bold shrink-0">2.</span>
            <span><strong className="text-white">Fees, chargebacks & holdbacks</strong> — Payment processors deduct their fees and chargeback reserves before settling. The bank amount is always less than the transaction amount by a non-trivial, variable percentage. This model ignores fees entirely — in production, every settlement would appear as a "mismatch" without fee reconciliation.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-orange-400 font-bold shrink-0">3.</span>
            <span><strong className="text-white">Volume & performance</strong> — The test data has ~100 transactions. At 100,000+ transactions/day, the naive O(n²) duplicate-detection and linear scan approach here would time out. Production needs indexed lookups, database-level deduplication, and stream-based reconciliation.</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
