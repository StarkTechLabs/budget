import React from 'react'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import CopyIcon from '@mui/icons-material/ContentCopy'

import useEventBus from '../../hooks/useEventBus/useEventBus'
import { formatCurrency } from '../../common/utils'

const CategoryList = ({ data }) => {
  const bus = useEventBus()

  const handleCopy = val => {
    navigator.clipboard && navigator.clipboard.writeText(val)
    bus.emit('show-notification', { content: 'Copied value!' })
  }
  const handleCopyFunc = val => () => handleCopy(val)

  const sortDescByValue = (a, b) => {
    if (b.value < a.value) return -1
    else if (b.value > a.value) return 1
    else return 0
  }

  return (
    <List>
      {data.sort(sortDescByValue).map(item => (
        <ListItem key={item.id} disablePadding>
          <ListItemButton onClick={handleCopyFunc(item.value)}>
            <ListItemText primary={`${item.id}: ${formatCurrency(item.value)}`} />
            <ListItemIcon>
              <CopyIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default CategoryList
