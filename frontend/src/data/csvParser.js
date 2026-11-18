/**
 * CSV Parser for PayRecon upload flow
 * Parses transactions.csv and settlements.csv into the internal data model
 */

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

export function parseTransactionsCSV(text) {
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  if (lines.length < 2) throw new Error('Transactions file must have a header row and at least one data row.');

  const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().trim());
  const required = ['txnid', 'date', 'amount', 'type'];
  for (const r of required) {
    if (!headers.includes(r)) throw new Error(`Transactions CSV missing required column: "${r}". Required: txnId, date, amount, type`);
  }

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const vals = parseCSVLine(lines[i]);
    const row = {};
    headers.forEach((h, idx) => { row[h] = vals[idx] || ''; });

    const amount = Math.round(parseFloat(row.amount) * 100); // convert ₹ to paise
    if (isNaN(amount)) throw new Error(`Row ${i + 1}: invalid amount "${row.amount}"`);

    rows.push({
      txnId:         row.txnid,
      date:          row.date,
      amount,
      type:          row.type?.toLowerCase() || 'payment',
      status:        row.status || 'settled',
      originalTxnId: row.originaltxnid || undefined,
      note:          row.note || '',
    });
  }
  return rows;
}

export function parseSettlementsCSV(text) {
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  if (lines.length < 2) throw new Error('Settlements file must have a header row and at least one data row.');

  const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().trim());
  const required = ['setid', 'settlementdate', 'amount', 'txnids'];
  for (const r of required) {
    if (!headers.includes(r)) throw new Error(`Settlements CSV missing required column: "${r}". Required: setId, settlementDate, amount, txnIds`);
  }

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const vals = parseCSVLine(lines[i]);
    const row = {};
    headers.forEach((h, idx) => { row[h] = vals[idx] || ''; });

    const amount = Math.round(parseFloat(row.amount) * 100);
    if (isNaN(amount)) throw new Error(`Row ${i + 1}: invalid amount "${row.amount}"`);

    const txnIds = row.txnids
      ? row.txnids.replace(/^"|"$/g, '').split(/[|;,]/).map(s => s.trim()).filter(Boolean)
      : [];

    rows.push({
      setId:          row.setid,
      settlementDate: row.settlementdate,
      amount,
      txnIds,
      note:           row.note || '',
    });
  }
  return rows;
}
