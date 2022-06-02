import React, { useState } from 'react'

import { DataGrid } from '@mui/x-data-grid'

import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const TransactionTable = ({ transactions, defaultPageSize = 5 }) => {
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const columns = [
    {
      field: 'transactionDate',
      headerName: 'Date',
      flex: 0.3
    },
    {
      field: 'clearingDate',
      headerName: 'Clearing Date',
      flex: 0.3
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 0.3
    },
    {
      field: 'merchant',
      headerName: 'Merchant',
      flex: 0.3
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 0.3
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 0.3
    },
    {
      field: 'purchaseBy',
      headerName: 'Purchased By',
      flex: 0.3
    },
    {
      field: 'amount',
      headerName: 'Amount (USD)',
      flex: 0.3
    }
  ]

  return (
    <DataGrid
      aria-label='transaction table'
      autoHeight
      rows={transactions || []}
      getRowId={row => `${row.transactionDate}-${row.amount}`}
      columns={columns}
      pageSize={pageSize}
      onPageSizeChange={pageSize => setPageSize(pageSize)}
      rowsPerPageOptions={[5, 10, 15, 25, 50]}
      rowCount={transactions && transactions.length}
      initialState={{
        columns: {
          columnVisibilityModel: {
            // hide columns at first
            clearingDate: false,
            description: false,
            purchaseBy: false,
            type: !isMobile,
            category: !isMobile
          }
        }
      }}
    />
  )
}

export default TransactionTable
