
import { parse } from 'csv-parse/browser/esm/sync'

const HEADER_MAP = {
  'Transaction Date': 'transactionDate',
  'Clearing Date': 'clearingDate',
  Description: 'description',
  Merchant: 'merchant',
  Category: 'category',
  Type: 'type',
  'Amount (USD)': 'amount',
  'Purchased By': 'purchasedBy'
}

const mapHeader = val => {
  if (!val || typeof val !== 'string') return ''

  return HEADER_MAP[val]
}

export const csvToArray = (str, delimiter = ',') => {
  const records = parse(str, {
    columns: true,
    skip_empty_lines: true
  })

  return records.map(rec => {
    const result = {}
    for (const key in rec) {
      if (Object.hasOwnProperty.call(rec, key)) {
        result[mapHeader(key)] = rec[key]
      }
    }
    return result
  })
}
