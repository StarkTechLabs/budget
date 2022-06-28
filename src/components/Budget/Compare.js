import React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { formatCurrency } from '../../common/utils'

const Compare = ({ data }) => {
  const sortDescByValue = (a, b) => {
    if (b.value < a.value) return -1
    else if (b.value > a.value) return 1
    else return 0
  }

  const formatValue = item => {
    const amount = item.limit - item.value
    if (amount === 0) {
      return <span>{formatCurrency(amount)}</span>
    }

    if (amount < 0) {
      return <span style={{ color: 'red' }}>{formatCurrency(amount)}</span>
    }

    return <span style={{ color: 'green' }}>+{formatCurrency(amount)}</span>
  }

  return (
    <TableContainer component={Paper}>
      <Table size='medium' aria-label='simple table'>
        <TableHead sx={{ backgroundColor: '#2fabb4' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
            <TableCell align='right' sx={{ fontWeight: 'bold' }}>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.sort(sortDescByValue).map(item => (
            <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {item.id}
              </TableCell>
              <TableCell align='right'>{formatValue(item)}</TableCell>
              {/* <ListItemText primary={item.id} secondary={formatValue(item)} /> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Compare
