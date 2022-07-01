import React, { useState } from 'react'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import AttachFileIcon from '@mui/icons-material/AttachFile'

function FileInput ({ children, onFileChange, accept, multiple = false, ...others }) {
  const [files, setFiles] = useState()

  return (
    <>
      <input
        style={{ display: 'none' }}
        id='contained-button-file'
        type='file'
        multiple={multiple}
        accept={accept}
        onChange={(e) => { onFileChange(e.currentTarget.files); setFiles(e.currentTarget.files) }}
      />
      <label htmlFor='contained-button-file'>
        <Button
          variant='outlined'
          component='span'
          endIcon={<AttachFileIcon color='primary' />}
          {...others}
        >
          {children}
        </Button>
      </label>
      {files && <Typography variant='body2'>Selected files: {files.length}</Typography>}
    </>
  )
}

// const File = ({ label, onFilesChanged, accept, multiple }) => {
//   const onFileChange = files => {
//     onFilesChanged && onFilesChanged(files)
//   }

//   return (
//     <FormControl>
//       <Typography variant='subtitle1'>{label}</Typography>
//       <br />
//       <FileInput onFileChange={onFileChange} accept={accept} multiple={multiple}>
//         {isLoading ? 'processing..' : 'select files'}
//       </FileInput>
//       {error && <ErrorView error={error} />}
//     </FormControl>
//   )
// }

export default FileInput
