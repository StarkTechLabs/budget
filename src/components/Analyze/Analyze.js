import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import Divider from '@mui/material/Divider'

import PieChartIcon from '@mui/icons-material/DonutSmall'
import TableIcon from '@mui/icons-material/TableChart'

import CategoryList from '../CategoryList/CategoryList'
import Expandable from '../Expandable/Expandable'
import Chart from '../Charts/Pie'
import TransactionTable from '../TransactionTable/TransactionTable'
import FilterInput from '../Filters/Input'
import TransformInput from '../Transforms/Input'
import BudgetInput from '../Budget/Input'
import BudgetCompare from '../Budget/Compare'

import useAppData from '../../hooks/useAppData/useAppData'

import strings from '../../common/strings'
import { group, sum, formatCurrency } from '../../common/utils'

const Analyze = () => {
  return (
    <Box m={1}>
      <Typography variant='h3' component='h2' mt={2} mb={2}>{strings.analyze.title}</Typography>
      <Divider sx={{ margin: 1 }} />
      <Box>
        <Typography variant='h4' component='h3'>{strings.analyze.spending.title}</Typography>
        <Spending />
      </Box>
      <br />
      <Typography variant='h4' component='h3'>{strings.analyze.budget.title}</Typography>
      <br />
      <Budget />
      <br />
      <Typography variant='h4' component='h3'>{strings.analyze.settings.title}</Typography>
      <br />
      <Settings />
    </Box>
  )
}

export default Analyze

const Spending = () => {
  const { data } = useAppData()
  const [tab, setTab] = useState('pie')
  const categoryData = group(data).filter(cat => cat.value > 0)

  if (!data) {
    return null
  }

  return (
    <>
      <Typography variant='subtitle1'>Total: <span>{formatCurrency(sum(data))}</span></Typography>
      <Box m={{ sm: 0, md: 2 }}>
        <ToggleButtonGroup value={tab} exclusive onChange={(_, v) => setTab(v)}>
          <ToggleButton value='pie' aria-label='pie'>
            <PieChartIcon />
          </ToggleButton>
          <ToggleButton value='table' aria-label='table'>
            <TableIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        {tab === 'pie' && <Chart data={categoryData} xlabel='Category' ylabel='Amount' />}
        {tab === 'table' && <CategoryList data={categoryData} />}
      </Box>
    </>
  )
}

const Settings = () => {
  const { data, filters, setFilters, transforms, setTransforms, budget, setBudget } = useAppData()

  const onFiltersChange = filters => {
    setFilters && setFilters(filters)
  }

  const onTransformsChange = transforms => {
    setTransforms && setTransforms(transforms)
  }

  const onBudgetChange = budget => {
    setBudget && setBudget(budget)
  }

  if (!data) {
    return null
  }

  return (
    <>
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
      <Expandable title='Budget'>
        <BudgetInput
          values={budget}
          onChange={onBudgetChange}
        />
      </Expandable>
    </>
  )
}

const findBudgetLimit = (budget, cat) => {
  const result = (budget || []).find(budget => budget.category === cat.id)
  return (result && +result.amount) ? +result.amount : 0
}

const Budget = () => {
  const { data, budget } = useAppData()
  const categoryData = group(data).filter(cat => cat.value > 0).map(cat => ({ ...cat, limit: findBudgetLimit(budget, cat) }))

  if (!data) {
    return null
  }

  window.budgetCompare = categoryData

  return (
    <>
      <BudgetCompare data={categoryData} />
    </>
  )
}
