import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase'

import Expandable from '../Expandable/Expandable'
import Chart from '../Charts/Pie'
import TransactionTable from '../TransactionTable/TransactionTable'
import FilterInput from '../Filters/Input'

import useAppData from '../../hooks/useAppData/useAppData'
import useMobile from '../../hooks/useMobile/useMobile'
import useEventBus from '../../hooks/useEventBus/useEventBus'

import strings from '../../common/strings'
import { group, sum, formatCurrency } from '../../common/utils'

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

  if (!data) {
    return null
  }

  return (
    <Box m={1}>
      <Typography variant='h4' component='h2' m={1}>{strings.analyze.title}</Typography>

      <Box m={3}>
        <Typography variant='subtitle1'>Total: <span>{formatCurrency(sum(data))}</span></Typography>
      </Box>
      <Box m={{ sm: 0, md: 2 }} display='flex' flexDirection={isMobile ? 'column' : 'row'}>
        <Chart data={categoryData} xlabel='Category' ylabel='Amount' />
        <div style={{ textAlign: 'left' }}>
          {(categoryData || []).map(cat => (
            <div key={cat.id}>
              <span>{cat.id}: </span>
              <ButtonBase onClick={handleCopyFunc(cat.value)}>{formatCurrency(cat.value)}</ButtonBase>
            </div>
          ))}
        </div>
      </Box>
      <br />
      <Expandable title='Transactions'>
        <TransactionTable transactions={data} />
      </Expandable>
      <Expandable title='Filters'>
        <FilterInput
          label=''
          values={filters}
          onChange={onFiltersChange}
        />
      </Expandable>
    </Box>
  )
}

export default Analyze
