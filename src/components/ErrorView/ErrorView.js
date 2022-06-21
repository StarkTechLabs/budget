import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import strings from '../../common/strings'

const ErrorView = ({ error }) => {
  const message = (error && error.message) ? error.message : error
  return (
    <Box m={2}>
      <Typography variant='subtitle2' color='error'>{strings.error.title}</Typography>
      <Typography variant='body1'>{message}</Typography>
    </Box>
  )
}

export default ErrorView
