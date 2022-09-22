import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { Icon } from 'components/Icon'

const useStyles = makeStyles(theme => ({
  logo: {
    padding: '49px 0 14px 0',
    marginLeft: '0',
  },
}))

export const LogoBar = () => {
  const classes = useStyles()
  
  return (
    <Grid
    container
    direction="row"
    justifyContent="flex-start"
  >
    <Grid 
      item
      className={classes.logo}
      data-test-id="logo"
      >
        <Icon name={'logo'} />
    </Grid>
  </Grid>
  )
}
