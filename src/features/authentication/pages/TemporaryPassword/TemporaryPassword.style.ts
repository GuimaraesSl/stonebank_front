import { makeStyles } from '@material-ui/core'
import { colors, theme } from '_config/theme'

export const useOnboardingStyles = makeStyles({
  container: {
    flexDirection: 'column',
    display: 'flex',
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: colors.system.light.primary,
  },
  content: {
    marginTop: '150px',
    [theme.breakpoints.down('xs')]: {
      marginTop: '110px',
    },
  },
  logo: {
    width: '42px',
    height: 42,
  },
  gridTitle: {
    color: colors.system.light.onPrimary,
    marginTop: 33,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 700,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 30,
    fontWeight: 300,
    textAlign: 'center',
  },
  buttonWrapper: {
    marginTop: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      borderWidth: 2,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '190px',
    },
    [theme.breakpoints.down('md')]: {
      marginTop: '160px',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '120px',
    },
  },
})
