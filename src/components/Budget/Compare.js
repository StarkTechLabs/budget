import React, { useState } from 'react'

import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import { formatCurrency } from '../../common/utils'

const Row = ({ row, transactions }) => {
  const [open, setOpen] = useState(false)

  const formatValue = item => {
    const amount = item.amount - item.spend
    if (amount === 0) {
      return <span>{formatCurrency(amount)}</span>
    }

    if (amount < 0) {
      return <span style={{ color: 'red' }}>{formatCurrency(amount)}</span>
    }

    return <span style={{ color: 'green' }}>+{formatCurrency(amount)}</span>
  }

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell sx={{ width: 50 }}>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell scope='row'>
          {row.category}
        </TableCell>
        <TableCell align='right'>{formatValue(row)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box m={1}>
              <Typography variant='subtitle1'>Transactions</Typography>
              <Typography variant='body1'>Budget: {formatCurrency(row.amount)} - Spend: {formatCurrency(row.spend)}</Typography>
              {transactions.length === 0 && <p>No transactions found in <i>{row.category}</i> category.</p>}
              {transactions.length > 0 && (
                <Table size='small' aria-label='detail'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Merchant</TableCell>
                      <TableCell>Purchased By</TableCell>
                      <TableCell align='right'>Amount ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.map(transaction => (
                      <TableRow key={`${transaction.transactionDate}-${transaction.amount}`}>
                        <TableCell component='th' scope='row'>
                          {transaction.transactionDate}
                        </TableCell>
                        <TableCell>{transaction.merchant}</TableCell>
                        <TableCell>{transaction.purchaseBy}</TableCell>
                        <TableCell align='right'>{formatCurrency(transaction.amount)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

const Compare = ({ data, transactions }) => {
  const sortDescByValue = (a, b) => {
    if (b.value < a.value) return -1
    else if (b.value > a.value) return 1
    else return 0
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label='budget collapsible table'>
        <TableHead sx={{ backgroundColor: '#2fabb4' }}>
          <TableRow>
            <TableCell sx={{ width: 50 }} />
            <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
            <TableCell align='right' sx={{ fontWeight: 'bold' }}>Amount ($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.sort(sortDescByValue).map(item => (
            <Row key={item.category} row={item} transactions={transactions.filter(t => t.category === item.category)} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Compare
