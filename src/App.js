import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

import theme from './common/theme'

import Header from './components/Header'
import Layout from './components/Layout'
import AppProvider from './components/AppProvider/AppProvider'

import Home from './views/Home'
import Analyze from './views/Analyze'

const AppContainer = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppProvider>
      <Router>
        <Header />
        <Layout>
          <Routes>
            <Route
              path='/analyze'
              element={<Analyze />}
            />
            <Route
              path='/' exact
              element={<Home />}
            />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  </ThemeProvider>
)

export default AppContainer
