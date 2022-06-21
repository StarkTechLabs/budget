import React from 'react'

import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const BasicSelect = ({ label, name, onChange, value = '', options, multiple, error }) => {
  return (
    <Box sx={{ marginTop: 2, marginBottom: 1, minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id='simple-select-label'>{label}</InputLabel>
        <Select
          labelId='simple-select-label'
          id='simple-select'
          name={name}
          value={value}
          label={label}
          multiple={multiple}
          onChange={onChange}
          error={error}
        >
          {options.map(opt => (
            <MenuItem key={opt.key || opt.value} value={opt.value}>{opt.value}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default BasicSelect
