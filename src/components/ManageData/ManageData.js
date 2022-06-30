import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

import useAppData from '../../hooks/useAppData/useAppData'
import useEventBus from '../../hooks/useEventBus/useEventBus'

const ManageData = () => {
  const { setTransactions, setBudget, setFilters, setTransforms } = useAppData()
  const bus = useEventBus()
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Box m={3} display='flex' justifyContent='flex-end'>
        <Button variant='outlined' onClick={() => setOpen(true)}>
          Manage Data
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Manage Data</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'space-evenly' }}>
          <Button variant='outlined' onClick={() => bus.emit('show-add-transaction-modal')} color='primary'>
            Add Transaction
          </Button>

          <br />
          <Button variant='outlined' onClick={() => setTransactions([])} color='error'>
            Clear Transactions
          </Button>
          <Button variant='outlined' onClick={() => setBudget([])} color='error'>
            Clear Budget
          </Button>
          <Button variant='outlined' onClick={() => setFilters([])} color='error'>
            Clear Filters
          </Button>
          <Button variant='outlined' onClick={() => setTransforms([])} color='error'>
            Clear Transforms
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ManageData
