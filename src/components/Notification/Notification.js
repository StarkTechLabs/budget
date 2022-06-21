import React, { useState } from 'react'

import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import useSubscribe from '../../hooks/useSubscribe/useSubscribe'

const Alert = React.forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const Notification = () => {
  const [active, setActive] = useState('')

  useSubscribe('show-notification', ({ content, severity = 'info', duration = 3000 }) => {
    !active && setActive({ content, severity, duration })
  })

  const handleClose = () => setActive(null)

  if (!active) {
    return null
  }

  return (
    <Snackbar
      open={!!active}
      autoHideDuration={active.duration}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      action={
        <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
          <CloseIcon fontSize='small' />
        </IconButton>
      }
    >
      <Alert onClose={handleClose} severity={active.severity} sx={{ width: '100%' }}>
        {active.content}
      </Alert>
    </Snackbar>
  )
}

export default Notification
