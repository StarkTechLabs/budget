import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'

import Select from '../Select/Select'

import useAppData from '../../hooks/useAppData/useAppData'
import useSubscribe from '../../hooks/useSubscribe/useSubscribe'

const typeOpts = [
  { key: 'Purchase', value: 'Purchase' },
  { key: 'Debit', value: 'Debit' },
  { key: 'Credit', value: 'Credit' },
  { key: 'Payment', value: 'Payment' }
]

const AddDialog = () => {
  const { transactions, setTransactions } = useAppData()
  const [open, setOpen] = useState(false)

  const [transactionDate, setTransactionDate] = useState('')
  const [category, setCategory] = useState('')
  const [merchant, setMerchant] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [amount, setAmount] = useState(0.0)
  const [purchasedBy, setPurchasedBy] = useState('')

  useSubscribe('show-add-transaction-modal', () => setOpen(true))

  const clear = () => {
    setTransactionDate('')
    setCategory('')
    setMerchant('')
    setDescription('')
    setType('')
    setAmount(0)
    setPurchasedBy('')
  }

  const handleClose = () => setOpen(false)

  const handleSubmit = () => {
    setTransactions([
      ...transactions,
      {
        transactionDate,
        category,
        merchant,
        description,
        type,
        amount,
        purchasedBy
      }
    ])

    clear()
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Add Transaction</DialogTitle>
      <DialogContent>
        <Box m={2}>
          <TextField
            label='Date'
            name='transactionDate'
            type='date'
            value={transactionDate}
            fullWidth
            onChange={e => setTransactionDate(e.target.value)}
          />
        </Box>
        <Box m={2}>
          <TextField
            label='Category'
            name='category'
            type='text'
            value={category}
            fullWidth
            onChange={e => setCategory(e.target.value)}
          />
        </Box>
        <Box m={2}>
          <TextField
            label='Merchant'
            name='merchant'
            type='text'
            value={merchant}
            fullWidth
            onChange={e => setMerchant(e.target.value)}
          />
        </Box>
        <Box m={2}>
          <TextField
            label='Description'
            name='description'
            type='text'
            value={description}
            fullWidth
            onChange={e => setDescription(e.target.value)}
          />
        </Box>
        <Box m={2}>
          <TextField
            label='Amount'
            name='amount'
            type='number'
            value={amount}
            fullWidth
            onChange={e => setAmount(e.target.value)}
          />
        </Box>
        <Box m={2}>
          <Select
            label='Type'
            name='type'
            value={type}
            options={typeOpts}
            onChange={e => setType(e.target.value)}
          />
        </Box>
        <Box m={2}>
          <TextField
            label='Purchased By'
            name='purchasedBy'
            type='text'
            value={purchasedBy}
            fullWidth
            onChange={e => setPurchasedBy(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={() => { clear(); handleClose() }} color='warning'>
          Cancel
        </Button>
        <Button variant='outlined' onClick={handleSubmit} color='primary'>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddDialog
