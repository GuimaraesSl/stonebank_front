import { makeStyles } from '@material-ui/core'
import { colors, theme } from '_config/theme'

const bottomSpacing = 16;
const screenHeight = window.screen.height;

export const useStyle = makeStyles({
  
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
    minHeight: '100vh',    
    backgroundColor: colors.system.light.secondaryContainer,
  },
  
  loginTitle: {
    color:colors.readOnly.light.blackLight,
    fontSize: '2.18rem',
    fontWeight: 700,
    fontFamily: "'Merriweather Sans', sans-serif",
    margin: '40px 0 0 0'
  },

  header: {
    color: colors.system.light.primary,
    marginBottom: 59,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 39,
    },
  },

  forgotPassword: {
    textAlign: 'right',
    textDecoration: 'underline',
  },

  contentWrapper: {
    paddingBottom: bottomSpacing,
    [theme.breakpoints.up('md')]: {
      padding: '0 20px',
    },
    [theme.breakpoints.down('md')]: {
      padding: '0 12px',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0 4px',
    },
  },
});
