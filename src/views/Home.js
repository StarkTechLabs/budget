/* global FileReader */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

import FileInput from '../components/File/File'

import useAppData from '../hooks/useAppData/useAppData'
import strings from '../common/strings'
import { csvToArray } from '../common/csv'

const Home = () => {
  const navigate = useNavigate()
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
      navigate('/analyze')
      setIsLoading(false)
    }
    reader.readAsText(file)
  }

  return (
    <Box m={3}>
      <Typography variant='h1' component='h1'>{strings.title}</Typography>
      <Box m={3} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
        <Typography variant='subtitle1'>{strings.uploadCopy}</Typography>
        <br />
        <FileInput onFileChange={onFileChange} accept='application/csv'>
          {isLoading ? 'processing..' : 'select file'}
        </FileInput>
        {isLoading && <CircularProgress />}
      </Box>

    </Box>
  )
}

export default Home
