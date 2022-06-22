import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import CategoryList from '../CategoryList/CategoryList'
import Expandable from '../Expandable/Expandable'
import Chart from '../Charts/Pie'
import TransactionTable from '../TransactionTable/TransactionTable'
import FilterInput from '../Filters/Input'
import TransformInput from '../Transforms/Input'

import useAppData from '../../hooks/useAppData/useAppData'
import useMobile from '../../hooks/useMobile/useMobile'

import strings from '../../common/strings'
import { group, sum, formatCurrency } from '../../common/utils'

const Analyze = () => {
  const { data, filters, setFilters, transforms, setTransforms } = useAppData()
  const { isMobile } = useMobile()
  const categoryData = group(data).filter(cat => cat.value > 0)
  window.transactions = data

  const onFiltersChange = filters => {
    setFilters && setFilters(filters)
  }

  const onTransformsChange = transforms => {
    setTransforms && setTransforms(transforms)
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
        <CategoryList data={categoryData} />
      </Box>
      <br />
      <Expandable title='Transactions'>
        <TransactionTable transactions={data} />
      </Expandable>
      <Expandable title='Filters'>
        <FilterInput
          values={filters}
          onChange={onFiltersChange}
        />
      </Expandable>
      <Expandable title='Transforms'>
        <TransformInput
          values={transforms}
          onChange={onTransformsChange}
        />
      </Expandable>
    </Box>
  )
}

export default Analyze
