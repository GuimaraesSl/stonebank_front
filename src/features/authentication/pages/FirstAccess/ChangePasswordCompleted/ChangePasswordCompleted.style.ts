import { makeStyles } from '@material-ui/core'
import { colors, theme } from '_config'

export const useStyles = makeStyles({
  container: {
    flexDirection: 'column',
    display: 'flex',
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: colors.system.light.primary,
  },

  content: {
    marginTop: '40px',
    [theme.breakpoints.down('xs')]: {
      marginTop: '20px',
    },
  },

  gridTitle: {
    color: colors.system.light.onPrimary,
    marginTop: 33,
  },

  title: {
    fontSize: 29,
    textAlign: 'center',
    fontWeight: 700,
  },

  subtitle: {
    fontSize: 18,
    marginTop: 8,
    fontWeight: 300,
    textAlign: 'center',
  },

  buttonWrapper: {
    marginTop: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'column',

    '&:hover': {
      borderWidth: 2,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '100px',
    },
    [theme.breakpoints.down('md')]: {
      marginTop: '70px',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '30px',
    },
  },
})
