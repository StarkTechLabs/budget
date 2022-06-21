import React from 'react'
import Container from '@mui/material/Container'

import Notification from './Notification/Notification'

const MobileScroll = () => (
  <div style={{ height: '100px', width: '100%' }} />
)

const Layout = ({ children }) => {
  return (
    <Container maxWidth='lg'>
      {children}
      <Notification />
      <MobileScroll />
    </Container>
  )
}

export default Layout
