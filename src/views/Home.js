/* global FileReader */
import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

import FileInput from '../components/File/File'
import Analyze from '../components/Analyze/Analyze'

import useAppData from '../hooks/useAppData/useAppData'
import strings from '../common/strings'
import { csvToArray } from '../common/csv'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { setTransactions } = useAppData()

  const onFileChange = (files) => {
    setIsLoading(true)
    const file = files[0]

    const reader = new FileReader()
    reader.onload = e => {
      const strData = e.target.result
      const data = csvToArray(strData)
      setTransactions(data)
      setIsLoading(false)
    }
    reader.readAsText(file)
  }

  return (
    <Box m={3}>
      <Typography variant='h3' component='h1'>{strings.title}</Typography>
      <Box m={3} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
        <Typography variant='subtitle1'>{strings.uploadCopy}</Typography>
        <br />
        <FileInput onFileChange={onFileChange} accept='application/csv'>
          {isLoading ? 'processing..' : 'select file'}
        </FileInput>
        {isLoading && <CircularProgress />}
      </Box>
      <Analyze />
    </Box>
  )
}

export default Home
