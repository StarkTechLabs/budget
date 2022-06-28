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

import Display from './Display'
import { generateId } from '../../common/utils'

export const schema = Yup.object().shape({
  id: Yup.string().required(),
  category: Yup.string().required(),
  amount: Yup.number().required()
})

const BudgetControl = ({ value, onRemove, onEdit }) => (
  <Box mt={1} mb={1}>
    <Display {...value} />
    <br />
    {onEdit && <IconButton onClick={() => onEdit(value)}><EditIcon /></IconButton>}
    {onRemove && <IconButton onClick={() => onRemove(value)}><DeleteIcon /></IconButton>}
    <Divider />
  </Box>
)

const BudgetInputDialog = ({ open, value, onSubmit, onClose }) => {
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState(0)

  const [validationError, setValidationError] = useState()

  useEffect(() => {
    if (value) {
      setCategory(value.category)
      setAmount(value.amount)
    }
  }, [value])

  const clear = () => {
    setCategory('')
    setAmount(0)
  }

  const handleClose = () => {
    clear()
    onClose && onClose()
  }

  const handleSubmit = () => {
    setValidationError(null)

    const data = {
      id: value ? value.id : generateId('b-'),
      category: category.trim(),
      amount
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
      <DialogTitle>New Budget Item</DialogTitle>
      <DialogContent>
        <Box m={2}>
          <TextField
            label='Category'
            name='category'
            type='text'
            value={category}
            fullWidth
            error={isError('category')}
            helperText={isError('category') && findError('category')}
            onChange={e => setCategory(e.target.value)}
          />
        </Box>
        <Box m={2}>
          <TextField
            label='Amount'
            name='amount'
            type='number'
            value={amount}
            fullWidth
            error={isError('amount')}
            helperText={isError('amount') && findError('amount')}
            onChange={e => setAmount(e.target.value)}
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

const Input = ({ label = '', values, onChange }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selected, setSelected] = useState()

  const handleRemove = item => {
    if (values && Array.isArray(values)) {
      const result = values.filter(v => v.id !== item.id)
      onChange && onChange(result)
    } else {
      onChange && onChange([])
    }
  }

  const handleEdit = item => {
    setSelected(item)
    setDialogOpen(true)
  }

  const handleSubmit = item => {
    if (values && Array.isArray(values)) {
      const result = values.filter(v => v.id !== item.id)
      result.push(item)
      onChange && onChange(result)
    } else {
      onChange && onChange([item])
    }
  }

  return (
    <>
      {label && <Typography variant='subtitle1'>{label}</Typography>}
      {Array.isArray(values) && values.map(v => (
        <BudgetControl key={`budget-item-${v && v.id}`} value={v} onRemove={handleRemove} onEdit={handleEdit} />
      ))}

      <Button variant='text' startIcon={<AddIcon />} onClick={() => setDialogOpen(true)}>Add</Button>
      <BudgetInputDialog open={dialogOpen} value={selected} onSubmit={handleSubmit} onClose={() => setDialogOpen(false)} />
    </>
  )
}

export default Input
