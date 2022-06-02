import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import TransactionTable from '../components/TransactionTable/TransactionTable'

import useAppData from '../hooks/useAppData/useAppData'
import strings from '../common/strings'

const Analyze = () => {
  const { transactions } = useAppData()
  return (
    <Box m={{ sm: 1, md: 3 }}>
      <Typography variant='h1' component='h1' m={1}>{strings.analyze.title}</Typography>
      <TransactionTable transactions={transactions} />
    </Box>
  )
}

export default Analyze
