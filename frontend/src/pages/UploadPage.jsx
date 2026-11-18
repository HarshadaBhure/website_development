import { useState, useRef, useCallback } from 'react';
import { parseTransactionsCSV, parseSettlementsCSV } from '../data/csvParser';

const TXN_FORMAT = [
  { col: 'txnId',         type: 'string',  required: true,  example: 'TXN-20241001-0001',    desc: 'Unique transaction ID' },
  { col: 'date',          type: 'YYYY-MM-DD', required: true, example: '2024-10-15',         desc: 'Transaction date (authorization)' },
  { col: 'amount',        type: 'decimal', required: true,  example: '1500.00 or -500.00',   desc: 'Amount in ₹. Negative = refund' },
  { col: 'type',          type: 'string',  required: true,  example: 'payment / refund',     desc: '"payment" or "refund"' },
  { col: 'status',        type: 'string',  required: false, example: 'settled',              desc: '"settled" or "pending_settlement"' },
  { col: 'originalTxnId', type: 'string',  required: false, example: 'TXN-20241001-0001',   desc: 'For refunds only — original TXN ID' },
  { col: 'note',          type: 'string',  required: false, example: 'any text',             desc: 'Optional description' },
];

const SET_FORMAT = [
  { col: 'setId',          type: 'string',     required: true,  example: 'SET-BATCH-0001',                  desc: 'Unique settlement batch ID' },
  { col: 'settlementDate', type: 'YYYY-MM-DD', required: true,  example: '2024-10-16',                     desc: 'Date bank moved funds' },
  { col: 'amount',         type: 'decimal',    required: true,  example: '3250.00 or -1200.00',             desc: 'Net batch amount in ₹' },
  { col: 'txnIds',         type: 'string',     required: true,  example: '"TXN-001|TXN-002"',               desc: 'Pipe-separated list of TXN IDs in this batch' },
  { col: 'note',           type: 'string',     required: false, example: 'any text',                        desc: 'Optional description' },
];

function DropZone({ label, icon, accept, onFile, file, error, color }) {
  const inputRef = useRef();
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback(e => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  }, [onFile]);

  const colorMap = {
    indigo: {
      border: dragging ? 'border-indigo-400 bg-indigo-500/10' : file ? 'border-indigo-500/60 bg-indigo-500/5' : 'border-white/20 hover:border-indigo-500/50 hover:bg-indigo-500/5',
      badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      dot: 'bg-indigo-400',
      btn: 'bg-indigo-600 hover:bg-indigo-500',
    },
    emerald: {
      border: dragging ? 'border-emerald-400 bg-emerald-500/10' : file ? 'border-emerald-500/60 bg-emerald-500/5' : 'border-white/20 hover:border-emerald-500/50 hover:bg-emerald-500/5',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      dot: 'bg-emerald-400',
      btn: 'bg-emerald-600 hover:bg-emerald-500',
    },
  };
  const c = colorMap[color];

  return (
    <div className="space-y-3">
      {/* Drop area */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${c.border} ${error ? 'border-red-500/50 bg-red-500/5' : ''}`}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={e => e.target.files[0] && onFile(e.target.files[0])}
        />
        <div className="text-4xl mb-3">{file ? '✅' : icon}</div>
        {file ? (
          <>
            <p className="text-white font-semibold">{file.name}</p>
            <p className="text-slate-400 text-sm mt-1">{(file.size / 1024).toFixed(1)} KB · Click to replace</p>
          </>
        ) : (
          <>
            <p className="text-white font-medium">{label}</p>
            <p className="text-slate-400 text-sm mt-1">Drag & drop or <span className="text-indigo-400 underline">browse</span></p>
            <p className="text-slate-600 text-xs mt-2">CSV files only</p>
          </>
        )}
      </div>
      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-300 text-sm">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}

function FormatTable({ columns, title, color }) {
  const c = color === 'indigo'
    ? { header: 'text-indigo-300', badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30', req: 'bg-red-500/20 text-red-300 border-red-500/30', opt: 'bg-slate-500/20 text-slate-400 border-slate-500/30' }
    : { header: 'text-emerald-300', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', req: 'bg-red-500/20 text-red-300 border-red-500/30', opt: 'bg-slate-500/20 text-slate-400 border-slate-500/30' };

  return (
    <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
      <div className="px-4 py-3 border-b border-white/10">
        <span className={`text-xs font-semibold uppercase tracking-wider ${c.header}`}>{title}</span>
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-white/5 text-slate-500 uppercase tracking-wider">
            <th className="px-4 py-2 text-left">Column</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Required</th>
            <th className="px-4 py-2 text-left">Example</th>
            <th className="px-4 py-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {columns.map(col => (
            <tr key={col.col} className="border-b border-white/5 hover:bg-white/5">
              <td className="px-4 py-2.5">
                <code className={`px-1.5 py-0.5 rounded text-xs border ${c.badge}`}>{col.col}</code>
              </td>
              <td className="px-4 py-2.5 text-slate-400">{col.type}</td>
              <td className="px-4 py-2.5">
                <span className={`px-1.5 py-0.5 rounded border text-xs ${col.required ? c.req : c.opt}`}>
                  {col.required ? 'Required' : 'Optional'}
                </span>
              </td>
              <td className="px-4 py-2.5 font-mono text-slate-300">{col.example}</td>
              <td className="px-4 py-2.5 text-slate-400">{col.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function UploadPage({ onDataLoaded, onUseSampleData }) {
  const [txnFile, setTxnFile]       = useState(null);
  const [setFile, setSetFile]       = useState(null);
  const [txnError, setTxnError]     = useState('');
  const [setError, setSetError]     = useState('');
  const [loading, setLoading]       = useState(false);
  const [showFormat, setShowFormat] = useState(false);

  const readFile = file => new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload  = e => res(e.target.result);
    reader.onerror = () => rej(new Error('Could not read file'));
    reader.readAsText(file);
  });

  const handleAnalyse = async () => {
    setTxnError('');
    setSetError('');
    if (!txnFile) { setTxnError('Please upload a transactions CSV file.'); return; }
    if (!setFile) { setSetError('Please upload a settlements CSV file.'); return; }

    setLoading(true);
    try {
      const [txnText, setTextRaw] = await Promise.all([readFile(txnFile), readFile(setFile)]);
      const transactions = parseTransactionsCSV(txnText);
      const settlements  = parseSettlementsCSV(setTextRaw);
      onDataLoaded({ transactions, settlements, source: 'upload' });
    } catch (err) {
      const msg = err.message || 'Parse error';
      if (msg.toLowerCase().includes('transactions') || msg.toLowerCase().includes('txn')) {
        setTxnError(msg);
      } else {
        setSetError(msg);
      }
      setLoading(false);
    }
  };

  const canAnalyse = txnFile && setFile && !loading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white font-sans">
      {/* ── Header ── */}
      <header className="border-b border-white/10 backdrop-blur-md bg-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 7h16a2 2 0 010 4H4a2 2 0 010-4z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">PayRecon</h1>
            <p className="text-xs text-slate-400">Month-End Payments Reconciliation</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-10">

        {/* ── Hero ── */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Upload your datasets to begin
          </div>
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Find Where Your Books Break
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Upload your platform transactions and bank settlements. PayRecon detects cross-month timing gaps, rounding errors, duplicate entries, and orphaned refunds — instantly.
          </p>
        </div>

        {/* ── Sample data banner ── */}
        <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 p-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-amber-300 mb-1">🧪 Want to try with test data first?</div>
            <p className="text-slate-400 text-sm">We've pre-generated sample CSVs with all 4 gap types planted. Download and upload them, or just click "Use Sample Data".</p>
            <div className="flex gap-3 mt-3">
              <a
                href="/samples/transactions.csv"
                download="transactions.csv"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium border border-white/20 transition-all"
              >
                ⬇ transactions.csv
              </a>
              <a
                href="/samples/settlements.csv"
                download="settlements.csv"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium border border-white/20 transition-all"
              >
                ⬇ settlements.csv
              </a>
            </div>
          </div>
          <button
            onClick={onUseSampleData}
            className="shrink-0 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all shadow-lg shadow-amber-500/30 hover:shadow-amber-400/40 hover:scale-105"
          >
            Use Sample Data →
          </button>
        </div>

        {/* ── Upload zones ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">1</div>
              <h3 className="font-semibold text-white">Platform Transactions</h3>
              <span className="text-xs text-red-400 font-medium">Required</span>
            </div>
            <DropZone
              label="Drop transactions.csv here"
              icon="💳"
              accept=".csv,text/csv"
              onFile={f => { setTxnFile(f); setTxnError(''); }}
              file={txnFile}
              error={txnError}
              color="indigo"
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">2</div>
              <h3 className="font-semibold text-white">Bank Settlements</h3>
              <span className="text-xs text-red-400 font-medium">Required</span>
            </div>
            <DropZone
              label="Drop settlements.csv here"
              icon="🏦"
              accept=".csv,text/csv"
              onFile={f => { setSetFile(f); setSetError(''); }}
              file={setFile}
              error={setError}
              color="emerald"
            />
          </div>
        </div>

        {/* ── Analyse button ── */}
        <div className="flex justify-center">
          <button
            onClick={handleAnalyse}
            disabled={!canAnalyse}
            className={`px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-2xl ${
              canAnalyse
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-500/30 hover:scale-105 cursor-pointer'
                : 'bg-white/10 text-slate-500 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-3">
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Analysing…
              </span>
            ) : (
              '🔍 Run Reconciliation'
            )}
          </button>
        </div>

        {/* ── Format reference (collapsible) ── */}
        <div>
          <button
            onClick={() => setShowFormat(v => !v)}
            className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors"
          >
            <svg className={`w-4 h-4 transition-transform ${showFormat ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {showFormat ? 'Hide' : 'Show'} CSV format reference
          </button>

          {showFormat && (
            <div className="mt-4 space-y-4">
              <FormatTable columns={TXN_FORMAT} title="transactions.csv — column reference" color="indigo" />
              <FormatTable columns={SET_FORMAT}  title="settlements.csv — column reference"  color="emerald" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="text-xs font-semibold text-indigo-300 mb-3 uppercase tracking-wider">transactions.csv preview</div>
                  <pre className="text-xs text-slate-400 overflow-x-auto leading-5">{`txnId,date,amount,type,status,originalTxnId
TXN-20241001-0001,2024-10-01,2500.00,payment,settled,
TXN-20241020-0024,2024-10-20,-1200.00,refund,settled,TXN-9999
TXN-20241031-0001,2024-10-31,2850.00,payment,pending_settlement,`}</pre>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="text-xs font-semibold text-emerald-300 mb-3 uppercase tracking-wider">settlements.csv preview</div>
                  <pre className="text-xs text-slate-400 overflow-x-auto leading-5">{`setId,settlementDate,amount,txnIds
SET-BATCH-0001,2024-10-02,4300.00,"TXN-001|TXN-002"
SET-BATCH-0002,2024-11-02,2850.00,"TXN-20241031-0001"`}</pre>
                </div>
              </div>

              <div className="rounded-xl bg-blue-500/10 border border-blue-500/30 p-4 text-sm text-blue-300">
                <strong>Notes:</strong>
                <ul className="mt-2 space-y-1 text-slate-300 text-xs list-disc list-inside">
                  <li>Amounts in <strong>₹ (rupees)</strong> as decimals — the engine converts to paise internally</li>
                  <li>Negative amounts for refunds (e.g. <code>-1200.00</code>)</li>
                  <li>Multiple TXN IDs in settlements separated by <code>|</code> (pipe) or <code>;</code> (semicolon)</li>
                  <li>Wrap multi-ID cells in quotes: <code>"TXN-001|TXN-002|TXN-003"</code></li>
                  <li>Column names are case-insensitive</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
