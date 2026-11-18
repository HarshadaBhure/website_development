/**
 * ASSUMPTIONS:
 * 1. Currency: INR. All amounts in paise (integer) to avoid floating-point rounding — but we
 *    deliberately introduce a decimal rounding bug in one batch to simulate real-world issues.
 * 2. Settlement window: 1–2 business days. Month-end transactions may settle in the next month.
 * 3. Transaction IDs follow "TXN-YYYYMMDD-NNNN" format; Settlement IDs follow "SET-BATCH-NNNN".
 * 4. Each settlement batch covers multiple transactions; bank sends one net amount per batch.
 * 5. A "refund" is a negative transaction. It must reference an original TXN ID.
 * 6. We plant exactly 4 gap types as specified in the problem statement.
 */

// ─── Helpers ───────────────────────────────────────────────────────────────

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function formatDate(dateStr) {
  return dateStr;
}

let txnCounter = 1;
let setCounter = 1;

function makeTxnId(dateStr) {
  const id = `TXN-${dateStr.replace(/-/g, '')}-${String(txnCounter).padStart(4, '0')}`;
  txnCounter++;
  return id;
}

function makeSetId() {
  const id = `SET-BATCH-${String(setCounter).padStart(4, '0')}`;
  setCounter++;
  return id;
}

// ─── Core generator ────────────────────────────────────────────────────────

export function generateTestData() {
  txnCounter = 1;
  setCounter = 1;

  const transactions = [];   // Platform ledger
  const settlements   = [];  // Bank statement

  // ── Normal transactions: Oct 1–29 (settle within same month) ──────────────
  const normalDates = [];
  for (let d = 1; d <= 29; d++) {
    normalDates.push(`2024-10-${String(d).padStart(2, '0')}`);
  }

  const normalTxns = [];
  normalDates.forEach(date => {
    const count = randomBetween(2, 4);
    for (let i = 0; i < count; i++) {
      const amount = randomBetween(50000, 500000); // 500 – 5000 INR in paise
      const txnId  = makeTxnId(date);
      normalTxns.push({ txnId, date, amount, type: 'payment', status: 'settled' });
      transactions.push({ txnId, date, amount, type: 'payment', status: 'settled', note: '' });
    }
  });

  // Create settlements for normal transactions (batch every 1-2 days)
  let i = 0;
  while (i < normalTxns.length) {
    const batchSize  = randomBetween(2, 5);
    const batch      = normalTxns.slice(i, i + batchSize);
    const settlDate  = addDays(batch[0].date, randomBetween(1, 2));
    const batchTotal = batch.reduce((sum, t) => sum + t.amount, 0);
    const setId      = makeSetId();
    settlements.push({
      setId,
      settlementDate: settlDate,
      amount: batchTotal,
      txnIds: batch.map(t => t.txnId),
      note: ''
    });
    i += batchSize;
  }

  // ══════════════════════════════════════════════════════════════════════════
  //  GAP 1 — Next-month settlement
  //  Transaction on Oct 31 settles on Nov 2 (next month).
  //  Platform shows it as Oct revenue; bank shows it in November.
  // ══════════════════════════════════════════════════════════════════════════
  const gap1TxnId = makeTxnId('2024-10-31');
  const gap1Amount = 285000; // ₹2,850
  transactions.push({
    txnId: gap1TxnId,
    date: '2024-10-31',
    amount: gap1Amount,
    type: 'payment',
    status: 'pending_settlement',
    note: '⚠️ GAP-1: Settled next month'
  });
  settlements.push({
    setId: makeSetId(),
    settlementDate: '2024-11-02',      // <-- November!
    amount: gap1Amount,
    txnIds: [gap1TxnId],
    note: '⚠️ GAP-1: Settled next month'
  });

  // ══════════════════════════════════════════════════════════════════════════
  //  GAP 2 — Rounding difference
  //  Three transactions each have a 0.5 paise rounding. Individually fine,
  //  but the sum shows a ₹1 discrepancy vs bank batch.
  // ══════════════════════════════════════════════════════════════════════════
  const roundingAmounts = [199950, 299950, 399950]; // each ends in .5 conceptually
  const roundingTxnIds  = roundingAmounts.map((_, idx) => {
    const dateStr = `2024-10-${String(10 + idx).padStart(2, '0')}`;
    return makeTxnId(dateStr);
  });

  roundingTxnIds.forEach((tid, idx) => {
    transactions.push({
      txnId: tid,
      date: `2024-10-${String(10 + idx).padStart(2, '0')}`,
      amount: roundingAmounts[idx],
      type: 'payment',
      status: 'settled',
      note: '⚠️ GAP-2: Rounding source txn'
    });
  });

  // Bank rounds differently: charges ₹1 less in total
  const bankRoundedTotal = roundingAmounts.reduce((s, a) => s + a, 0) - 1;
  settlements.push({
    setId: makeSetId(),
    settlementDate: '2024-10-13',
    amount: bankRoundedTotal,  // Off by ₹0.01 (1 paise) due to FX rounding
    txnIds: roundingTxnIds,
    note: '⚠️ GAP-2: Rounding difference (₹0.01 short)'
  });

  // ══════════════════════════════════════════════════════════════════════════
  //  GAP 3 — Duplicate transaction entry
  //  TXN-20241015-XXXX appears twice in the platform ledger (data pipeline bug).
  //  Bank settles it only once.
  // ══════════════════════════════════════════════════════════════════════════
  const dupOriginalId = makeTxnId('2024-10-15');
  const dupAmount     = 175000; // ₹1,750
  transactions.push({
    txnId: dupOriginalId,
    date: '2024-10-15',
    amount: dupAmount,
    type: 'payment',
    status: 'settled',
    note: '⚠️ GAP-3: Original entry'
  });
  transactions.push({
    txnId: dupOriginalId,         // Same ID — duplicate!
    date: '2024-10-15',
    amount: dupAmount,
    type: 'payment',
    status: 'settled',
    note: '⚠️ GAP-3: DUPLICATE entry (data pipeline bug)'
  });
  settlements.push({
    setId: makeSetId(),
    settlementDate: '2024-10-16',
    amount: dupAmount,            // Bank only settled once
    txnIds: [dupOriginalId],
    note: '⚠️ GAP-3: Only one settlement for duplicate'
  });

  // ══════════════════════════════════════════════════════════════════════════
  //  GAP 4 — Refund with no matching original transaction
  //  A refund is issued on Oct 20, but the original transaction ID doesn't
  //  exist in the platform ledger (possibly deleted or from a different system).
  // ══════════════════════════════════════════════════════════════════════════
  const phantomOriginalId = 'TXN-20241001-9999'; // Does NOT exist in transactions
  const refundTxnId       = makeTxnId('2024-10-20');
  transactions.push({
    txnId: refundTxnId,
    date: '2024-10-20',
    amount: -120000,              // Negative = refund, ₹1,200
    type: 'refund',
    status: 'settled',
    originalTxnId: phantomOriginalId,
    note: '⚠️ GAP-4: Refund with no matching original TXN'
  });
  settlements.push({
    setId: makeSetId(),
    settlementDate: '2024-10-21',
    amount: -120000,
    txnIds: [refundTxnId],
    note: '⚠️ GAP-4: Refund settlement (original TXN missing)'
  });

  return { transactions, settlements };
}

// ─── Reconciliation Engine ─────────────────────────────────────────────────

export function reconcile(transactions, settlements) {
  const gaps = [];

  // ── Index transactions by ID ─────────────────────────────────────────────
  const txnMap   = {};
  const txnCount = {}; // track duplicates
  transactions.forEach(txn => {
    txnMap[txn.txnId]   = txn;
    txnCount[txn.txnId] = (txnCount[txn.txnId] || 0) + 1;
  });

  // ── GAP-3: Duplicate detection ───────────────────────────────────────────
  Object.entries(txnCount).forEach(([id, count]) => {
    if (count > 1) {
      gaps.push({
        type: 'GAP-3',
        label: 'Duplicate Transaction',
        severity: 'high',
        txnId: id,
        detail: `Transaction ${id} appears ${count}× in platform ledger but bank settled it once.`,
        impact: txnMap[id]?.amount || 0,
        date: txnMap[id]?.date || '',
      });
    }
  });

  // ── GAP-4: Refund with no matching original ──────────────────────────────
  transactions.forEach(txn => {
    if (txn.type === 'refund' && txn.originalTxnId) {
      if (!txnMap[txn.originalTxnId]) {
        gaps.push({
          type: 'GAP-4',
          label: 'Orphaned Refund',
          severity: 'high',
          txnId: txn.txnId,
          detail: `Refund ${txn.txnId} references original ${txn.originalTxnId} which does not exist in platform ledger.`,
          impact: txn.amount,
          date: txn.date,
        });
      }
    }
  });

  // ── Match settlements to transactions ───────────────────────────────────
  settlements.forEach(set => {
    const txnIds = set.txnIds || [];
    const platformTotal = txnIds.reduce((sum, id) => {
      const txn = txnMap[id];
      return sum + (txn ? txn.amount : 0);
    }, 0);

    // GAP-1: Next-month settlement
    txnIds.forEach(id => {
      const txn = txnMap[id];
      if (txn) {
        const txnMonth  = txn.date.substring(0, 7);
        const setMonth  = set.settlementDate.substring(0, 7);
        if (txnMonth !== setMonth) {
          gaps.push({
            type: 'GAP-1',
            label: 'Cross-Month Settlement',
            severity: 'medium',
            txnId: id,
            detail: `Transaction ${id} dated ${txn.date} settled on ${set.settlementDate} (different month). Platform counts revenue in ${txnMonth}; bank in ${setMonth}.`,
            impact: txn.amount,
            date: txn.date,
            settlementDate: set.settlementDate,
          });
        }
      }
    });

    // GAP-2: Rounding difference
    const diff = Math.abs(platformTotal - set.amount);
    if (diff > 0 && diff <= 100) { // ≤ ₹1 rounding
      gaps.push({
        type: 'GAP-2',
        label: 'Rounding Discrepancy',
        severity: 'low',
        txnId: set.setId,
        detail: `Settlement batch ${set.setId}: Platform total ₹${(platformTotal/100).toFixed(2)} vs Bank ₹${(set.amount/100).toFixed(2)}. Difference of ₹${(diff/100).toFixed(2)} — likely rounding.`,
        impact: diff,
        date: set.settlementDate,
      });
    } else if (diff > 100) {
      gaps.push({
        type: 'GAP-X',
        label: 'Amount Mismatch',
        severity: 'high',
        txnId: set.setId,
        detail: `Settlement batch ${set.setId}: Platform ₹${(platformTotal/100).toFixed(2)} ≠ Bank ₹${(set.amount/100).toFixed(2)}. Difference ₹${(diff/100).toFixed(2)}.`,
        impact: diff,
        date: set.settlementDate,
      });
    }
  });

  // ── Summary stats ────────────────────────────────────────────────────────
  const uniqueTxns     = [...new Map(transactions.map(t => [t.txnId, t])).values()];
  const platformTotal  = uniqueTxns.reduce((s, t) => s + t.amount, 0);
  const bankTotal      = settlements
    .filter(s => s.settlementDate.startsWith('2024-10'))
    .reduce((s, t) => s + t.amount, 0);
  const totalGapAmount = gaps.reduce((s, g) => s + Math.abs(g.impact), 0);

  return {
    gaps,
    summary: {
      totalTransactions: transactions.length,
      uniqueTransactions: uniqueTxns.length,
      totalSettlements: settlements.length,
      platformTotal,
      bankTotal,
      difference: platformTotal - bankTotal,
      totalGapAmount,
      gapCount: gaps.length,
    }
  };
}
