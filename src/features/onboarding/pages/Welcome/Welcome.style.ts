import { makeStyles } from '@material-ui/core'
import { colors, theme } from '_config/theme'
import welcomeImg from '_assets/img/welcome-img.svg'

export const useOnboardingStyles = makeStyles({

  container: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: colors.system.light.primary,
    backgroundPosition: 'top',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '900px',

    [theme.breakpoints.up('md')]: {
      padding: '0 50px',
    },
    [theme.breakpoints.down('md')]: {
      padding: '0 42px',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0 34px',
    },
  },
  
  content: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '200px',
      marginBottom: '96px',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '10px',
      marginBottom: '64px',
    },
  },


  logo: {
    padding: '41px 0px',
    marginLeft: '0',
    marginBottom: 72,
  },

  containerImg: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '45vh',
  },

  img:{

  },

  title: {
    marginBottom: 4,
    fontFamily: 'Baloo Bhaina',
    color: colors.system.light.onPrimary,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 8,
    },
  },

  buttonsSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'absolute',
    padding: '100px 64px 0',
    alignContent: 'center',
  },

  signInButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 40px',
    [theme.breakpoints.down('xs')]: {
      margin: '0 20px',
    },
  },

  onboardingButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      borderWidth: 2,
    },
  },
})
