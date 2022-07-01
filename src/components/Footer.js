import React from 'react'

import Box from '@mui/material/Box'

import { version } from '../../package.json'

const Footer = () => {
  return (
    <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
      <span>Built by StarkTech | Copyright &reg; 2022</span>
      <span>Version: {version}</span>
    </Box>
  )
}

export default Footer
