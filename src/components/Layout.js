import React from 'react'
import Container from '@mui/material/Container'

import Notification from './Notification/Notification'
import Footer from './Footer'

const MobileScroll = () => (
  <div style={{ height: '100px', width: '100%' }} />
)

const Layout = ({ children }) => {
  return (
    <Container maxWidth='lg'>
      {children}
      <Footer />
      <Notification />
      <MobileScroll />
    </Container>
  )
}

export default Layout
