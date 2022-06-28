import React from 'react'
import { Link } from 'react-router-dom'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import makeStyles from '@mui/styles/makeStyles'
import CreditCard from '@mui/icons-material/CreditCard'
import GitHubIcon from '@mui/icons-material/GitHub'

import strings from '../common/strings'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    margin: theme.spacing(0, 1),
    cursor: 'pointer',
    color: '#fff',
    textDecoration: 'none'
  },
  iconWrapper: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 11
  }
}))

const Header = () => {
  const classes = useStyles()

  return (
    <div className={classes.grow}>
      <AppBar position='static' color='primary' enableColorOnDark>
        <Toolbar>
          <IconButton aria-label='search' className={classes.iconWrapper} component={Link} to='/'>
            <CreditCard color='secondary' />
          </IconButton>
          <Typography
            variant='h6' noWrap
            className={classes.title}
            component={Link} to='/'
          >
            {strings.title}
          </Typography>
          <IconButton aria-label='github' className={classes.iconWrapper} href='https://github.com/StarkTechLabs/budget'>
            <GitHubIcon color='secondary' />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
