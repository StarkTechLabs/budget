import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase'

import Chart from '../components/Charts/Pie'

import TransactionTable from '../components/TransactionTable/TransactionTable'
import FilterInput from '../components/Filters/Input'

import useAppData from '../hooks/useAppData/useAppData'
import useMobile from '../hooks/useMobile/useMobile'
import useEventBus from '../hooks/useEventBus/useEventBus'

import strings from '../common/strings'
import { group, sum, formatCurrency } from '../common/utils'

const Analyze = () => {
  const { data, filters, setFilters } = useAppData()
  const { isMobile } = useMobile()
  const bus = useEventBus()
  const categoryData = group(data).filter(cat => cat.value > 0)
  window.transactions = data

  const handleCopy = val => {
    navigator.clipboard && navigator.clipboard.writeText(val)
    bus.emit('show-notification', { content: 'Copied value!' })
  }
  const handleCopyFunc = val => () => handleCopy(val)

  const onFiltersChange = filters => {
    setFilters && setFilters(filters)
  }

  return (
    <Box m={{ sm: 1, md: 3 }}>
      <Typography variant='h3' component='h1' m={1}>{strings.analyze.title}</Typography>

      <Box m={3}>
        <Typography variant='subtitle1'>Total: <span>{formatCurrency(sum(data))}</span></Typography>

      </Box>
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
      <TransactionTable transactions={data} />
      <Box m={2}>
        <FilterInput
          label='Filters'
          values={filters}
          onChange={onFiltersChange}
        />
      </Box>
    </Box>
  )
}

export default Analyze
