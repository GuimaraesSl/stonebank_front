import React from 'react'
import { AppBar as MuiAppBar, Box, Toolbar } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import companyLogo from '_assets/img/logo-small.svg'

import { useStyles } from './AppBar.style'

interface AppBarProps {
  homeRoute: string
  action?: React.ReactNode
}

export const AppBar: React.FC<AppBarProps> = ({
  homeRoute,
  action,
  ...rest
}: AppBarProps) => {
  const style = useStyles()
  const history = useHistory()

  const onLogoClick = () => history.push(homeRoute)

  return (
    <MuiAppBar
      color="primary"
      elevation={0}
      position="relative"
      data-test-id="appbar"
      {...rest}
    >
      <Toolbar className={style.toolbar}>
        <Box className={style.logo}>
          <img
            src={companyLogo}
            onClick={onLogoClick}
            alt="logo"
            data-test-id="logo"
          />
        </Box>
        {action}
      </Toolbar>
    </MuiAppBar>
  )
}
