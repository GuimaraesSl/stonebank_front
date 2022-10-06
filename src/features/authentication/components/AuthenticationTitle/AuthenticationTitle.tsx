import React from 'react'
import { Typography } from '@material-ui/core'
import { ConfigContext } from '_config'
import { makeStyles } from '@material-ui/core/styles'
import { colors } from '_config/theme'


const useStyles = makeStyles(theme => ({
  title: {
    // color: colors.readOnly.light.blackLight,
    fontSize: '1.125rem',
    fontFamily: "'Baloo Bhaina 2', cursive",
    margin: '4px 0 0 0'
  },
}))


export const AuthenticationTitle: React.FC = () => {
  const classes = useStyles()
  const { company } = React.useContext(ConfigContext)

  return (
    <Typography 
      variant="h5"
      align="center"
      data-test-id="authentication-title"
      className={classes.title}
    >
      Seja bem-vindo ao
      <br />
      <strong>StoneBank</strong>
    </Typography>
  );
};
