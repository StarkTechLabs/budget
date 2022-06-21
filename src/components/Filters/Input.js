import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

import ErrorView from '../ErrorView/ErrorView'
import Select from '../Select/Select'

import Display from './Display'
import { generateId } from '../../common/utils'

export const schema = Yup.object().shape({
  id: Yup.string().required(),
  field: Yup.string().required(),
  operation: Yup.string().required(),
  term: Yup.string().required()
})

const FilterControl = ({ value, onRemove, onEdit }) => (
  <Box mt={1} mb={1}>
    <Display {...value} />
    <br />
    {onEdit && <IconButton onClick={() => onEdit(value)}><EditIcon /></IconButton>}
    {onRemove && <IconButton onClick={() => onRemove(value)}><DeleteIcon /></IconButton>}
    <Divider />
  </Box>
)

const fieldOpts = [
  { value: 'transactionDate' },
  { value: 'clearingDate' },
  { value: 'description' },
  { value: 'merchant' },
  { value: 'category' },
  { value: 'type' },
  { value: 'purchaseBy' },
  { value: 'amount' }
]

const operationOpts = [
  { value: 'contains' },
  { value: 'equals' },
  { value: 'does not contain' },
  { value: 'does not equal' }
]

const FilterInputDialog = ({ open, value, onSubmit, onClose }) => {
  const [field, setField] = useState('')
  const [operation, setOperation] = useState('')
  const [term, setTerm] = useState('')

  const [validationError, setValidationError] = useState()

  useEffect(() => {
    if (value) {
      setField(value.field)
      setOperation(value.operation)
      setTerm(value.term)
    }
  }, [value])

  const clear = () => {
    setField('')
    setOperation('')
    setTerm('')
  }

  const handleClose = () => {
    clear()
    onClose && onClose()
  }

  const handleSubmit = () => {
    setValidationError(null)

    const data = {
      id: value ? value.id : generateId('f-'),
      field,
      operation,
      term: term.trim()
    }

    let valid = false
    try {
      schema.validateSync(data, { abortEarly: false })
      valid = true
    } catch (err) {
      console.error('validation err', err)
      setValidationError({ ...err, message: err.errors.join(', ') })
      valid = false
    }

    if (valid) {
      onSubmit(data)
      clear()
      onClose && onClose()
    }
  }

  const isError = key => {
    return !!(validationError && validationError.inner && validationError.inner.find(err => err.path === key))
  }
  const findError = key => {
    return validationError && validationError.inner && validationError.inner.find(err => err.path === key).message
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>New Location</DialogTitle>
      <DialogContent>
        <Box m={2}>
          <Select
            label='Field'
            name='field'
            value={field}
            options={fieldOpts}
            error={isError('field')}
            helperText={isError('field') && findError('field')}
            onChange={e => setField(e.target.value)}
          />
        </Box>
        <Box m={2}>
          <Select
            label='Operation'
            name='numOfClinicians'
            value={operation}
            options={operationOpts}
            error={isError('operation')}
            helperText={isError('operation') && findError('operation')}
            onChange={e => setOperation(e.target.value)}
          />
        </Box>
        <Box m={2}>
          <TextField
            label='Value'
            name='term'
            type='text'
            value={term}
            fullWidth
            error={isError('term')}
            helperText={isError('term') && findError('term')}
            onChange={e => setTerm(e.target.value)}
          />
        </Box>
        {validationError && <ErrorView error={validationError} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}

const Input = ({ label, values, onChange }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selected, setSelected] = useState()

  const handleRemove = filter => {
    if (values && Array.isArray(values)) {
      const result = values.filter(v => v.id !== filter.id)
      onChange && onChange(result)
    } else {
      onChange && onChange([])
    }
  }

  const handleEdit = filter => {
    console.log('selected', filter)
    setSelected(filter)
    setDialogOpen(true)
  }

  const handleSubmit = filter => {
    if (values && Array.isArray(values)) {
      const result = values.filter(v => v.id !== filter.id)
      result.push(filter)
      onChange && onChange(result)
    } else {
      onChange && onChange([filter])
    }
  }

  return (
    <>
      {label && <Typography variant='subtitle1'>{label}</Typography>}
      {Array.isArray(values) && values.map(v => (
        <FilterControl key={`filter-${v && v.id}`} value={v} onRemove={handleRemove} onEdit={handleEdit} />
      ))}

      <Button variant='text' startIcon={<AddIcon />} onClick={() => setDialogOpen(true)}>Add</Button>
      <FilterInputDialog open={dialogOpen} value={selected} onSubmit={handleSubmit} onClose={() => setDialogOpen(false)} />
    </>
  )
}

export default Input
