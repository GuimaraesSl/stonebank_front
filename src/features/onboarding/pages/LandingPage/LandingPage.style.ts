import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 144,
    backgroundColor: colors.system.light.primary,
    '& img': {},
  },

  transferBox: {
    padding: '40px',
  },

  transferContainer: {
    textAlign: 'center',
    margin: 'auto',
  },

  totalContainer: {
    boxSizing: 'content-box',
    backgroundColor: '#F9F9F9',
  },

  title: {
    fontWeight: 'bold',
    fontSize: '18px',
    textAlign: 'center',
    color: colors.system.light.neutral,
    marginBottom: '25px',
    lineHeight: '1.3rem',
  },

  description: {
    fontSize: '11px',
    textAlign: 'center',
    color: colors.system.light.neutral,

    lineHeight: '0.9rem',
  },

  containerButtons: {
    padding: '12px 0',
  },

  footerText: {
    fontSize: '10px',
    textAlign: 'center',
    padding: '18px 0 8px 0',
    lineHeight: '11px',
  },

  footerLink: {
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    padding: '8px 0',
    lineHeight: '13px',
    '& a': {
      textDecoration: 'none',
      color: colors.system.light.neutral,
    },
  },
})
