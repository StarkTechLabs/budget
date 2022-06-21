import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase'

import Chart from '../components/Charts/Pie'

import TransactionTable from '../components/TransactionTable/TransactionTable'

import useAppData from '../hooks/useAppData/useAppData'
import useMobile from '../hooks/useMobile/useMobile'
import useEventBus from '../hooks/useEventBus/useEventBus'

import strings from '../common/strings'
import { group } from '../common/utils'

const Analyze = () => {
  const { transactions } = useAppData()
  const { isMobile } = useMobile()
  const bus = useEventBus()
  const categoryData = group(transactions).filter(cat => cat.value > 0)
  window.data = categoryData
  window.transactions = transactions

  const handleCopy = val => {
    navigator.clipboard && navigator.clipboard.writeText(val)
    bus.emit('show-notification', { content: 'Copied!' })
  }
  const handleCopyFunc = val => () => handleCopy(val)

  return (
    <Box m={{ sm: 1, md: 3 }}>
      <Typography variant='h3' component='h1' m={1}>{strings.analyze.title}</Typography>

      <Box m={{ sm: 0, md: 2 }} display='flex' flexDirection={isMobile ? 'column' : 'row'}>
        <Chart data={categoryData} xlabel='Category' ylabel='Amount' />
        <div style={{ textAlign: 'left' }}>
          {(categoryData || []).map(cat => (
            <div key={cat.id}>
              <span>{cat.id}: </span>
              <ButtonBase onClick={handleCopyFunc(cat.value)}>{cat.value}</ButtonBase>
            </div>
          ))}
        </div>
      </Box>
      <TransactionTable transactions={transactions} />
    </Box>
  )
}

export default Analyze
