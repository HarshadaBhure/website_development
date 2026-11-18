import { useState, useMemo } from 'react';
import { reconcile } from '../data/generateTestData';
import SummaryCards from '../components/SummaryCards';
import GapsTable from '../components/GapsTable';
import TransactionTable from '../components/TransactionTable';
import SettlementTable from '../components/SettlementTable';
import GapTimeline from '../components/GapTimeline';
import AssumptionsPanel from '../components/AssumptionsPanel';

const TABS = ['Overview', 'Gaps', 'Transactions', 'Settlements', 'Timeline', 'Assumptions'];

export default function ReconciliationDashboard({ transactions, settlements, source, onReset }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [filterGap, setFilterGap] = useState('ALL');

  const { gaps, summary } = useMemo(
    () => reconcile(transactions, settlements),
    [transactions, settlements]
  );

  const filteredGaps = filterGap === 'ALL' ? gaps : gaps.filter(g => g.type === filterGap);

  // Determine period label from data
  const dates = transactions.map(t => t.date).filter(Boolean).sort();
  const periodLabel = dates.length
    ? `${dates[0]} → ${dates[dates.length - 1]}`
    : 'Uploaded Data';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white font-sans">
      {/* ── Header ── */}
      <header className="border-b border-white/10 backdrop-blur-md bg-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 7h16a2 2 0 010 4H4a2 2 0 010-4z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">PayRecon</h1>
              <p className="text-xs text-slate-400">{periodLabel}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {source === 'sample' && (
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold">
                Sample Data
              </span>
            )}
            {source === 'upload' && (
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                Uploaded Data
              </span>
            )}
            <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${
              gaps.length > 0
                ? 'bg-red-500/20 border-red-500/40 text-red-300 animate-pulse'
                : 'bg-green-500/20 border-green-500/40 text-green-300'
            }`}>
              {gaps.length > 0 ? `${gaps.length} Gaps Found` : '✅ Balanced'}
            </span>
            <button
              onClick={onReset}
              className="ml-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-medium border border-white/10 transition-all flex items-center gap-1.5"
            >
              ← New Analysis
            </button>
          </div>
        </div>
      </header>

      {/* ── Tab Nav ── */}
      <nav className="max-w-7xl mx-auto px-6 pt-6">
        <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/10 w-fit">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
              {tab === 'Gaps' && gaps.length > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-xs font-bold leading-none">
                  {gaps.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Content ── */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {activeTab === 'Overview' && (
          <>
            <SummaryCards summary={summary} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GapBreakdownCard gaps={gaps} />
              <SeverityCard gaps={gaps} />
            </div>
            <GapsTable gaps={gaps.slice(0, 5)} mini />
          </>
        )}

        {activeTab === 'Gaps' && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">All Detected Gaps</h2>
              <div className="flex gap-2">
                {['ALL', 'GAP-1', 'GAP-2', 'GAP-3', 'GAP-4', 'GAP-X'].map(type => (
                  <button
                    key={type}
                    onClick={() => setFilterGap(type)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      filterGap === type
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {type}
                    {type !== 'ALL' && gaps.filter(g => g.type === type).length > 0 && (
                      <span className="ml-1 opacity-60">({gaps.filter(g => g.type === type).length})</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <GapsTable gaps={filteredGaps} />
          </>
        )}

        {activeTab === 'Transactions' && (
          <TransactionTable transactions={transactions} gaps={gaps} />
        )}

        {activeTab === 'Settlements' && (
          <SettlementTable settlements={settlements} gaps={gaps} />
        )}

        {activeTab === 'Timeline' && (
          <GapTimeline transactions={transactions} settlements={settlements} gaps={gaps} />
        )}

        {activeTab === 'Assumptions' && (
          <AssumptionsPanel />
        )}
      </main>

      <footer className="border-t border-white/5 mt-16 py-8 text-center">
        <p className="text-slate-500 text-sm">
          PayRecon · {transactions.length} transactions · {settlements.length} settlement batches ·{' '}
          <button onClick={onReset} className="text-indigo-400 hover:text-indigo-300 underline">New Analysis</button>
        </p>
      </footer>
    </div>
  );
}

// ─── Mini chart cards ───────────────────────────────────────────────────────

function GapBreakdownCard({ gaps }) {
  const counts = { 'GAP-1': 0, 'GAP-2': 0, 'GAP-3': 0, 'GAP-4': 0, 'GAP-X': 0 };
  gaps.forEach(g => { counts[g.type] = (counts[g.type] || 0) + 1; });

  const colors = {
    'GAP-1': 'bg-amber-500',
    'GAP-2': 'bg-blue-500',
    'GAP-3': 'bg-red-500',
    'GAP-4': 'bg-purple-500',
    'GAP-X': 'bg-orange-500',
  };
  const labels = {
    'GAP-1': 'Cross-Month Settlement',
    'GAP-2': 'Rounding Discrepancy',
    'GAP-3': 'Duplicate Entry',
    'GAP-4': 'Orphaned Refund',
    'GAP-X': 'Amount Mismatch',
  };

  const total = gaps.length || 1;
  const hasGaps = Object.values(counts).some(v => v > 0);

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
      <h3 className="font-semibold text-white mb-5">Gap Type Breakdown</h3>
      {!hasGaps ? (
        <div className="text-center py-8 text-slate-500">
          <div className="text-3xl mb-2">✅</div>
          <div>No gaps detected</div>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(counts).filter(([, v]) => v > 0).map(([type, count]) => (
            <div key={type}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-slate-300">{labels[type]}</span>
                <span className="text-white font-medium">{count}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${colors[type]} transition-all duration-700`}
                  style={{ width: `${(count / total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SeverityCard({ gaps }) {
  const sevCount = { high: 0, medium: 0, low: 0 };
  gaps.forEach(g => { sevCount[g.severity] = (sevCount[g.severity] || 0) + 1; });
  const totalImpact = gaps.reduce((s, g) => s + Math.abs(g.impact), 0);

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
      <h3 className="font-semibold text-white mb-5">Severity &amp; Financial Impact</h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { level: 'high',   color: 'text-red-400',   bg: 'bg-red-500/10 border-red-500/30',   label: 'High' },
          { level: 'medium', color: 'text-amber-400',  bg: 'bg-amber-500/10 border-amber-500/30', label: 'Medium' },
          { level: 'low',    color: 'text-green-400',  bg: 'bg-green-500/10 border-green-500/30', label: 'Low' },
        ].map(({ level, color, bg, label }) => (
          <div key={level} className={`rounded-xl border p-4 text-center ${bg}`}>
            <div className={`text-2xl font-bold ${color}`}>{sevCount[level] || 0}</div>
            <div className="text-xs text-slate-400 mt-1">{label}</div>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-white/5 p-4 border border-white/10">
        <div className="text-xs text-slate-400 mb-1">Total Financial Exposure</div>
        <div className="text-2xl font-bold text-white">
          ₹{(totalImpact / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </div>
        <div className="text-xs text-slate-500 mt-1">Across all gap types</div>
      </div>
    </div>
  );
}
