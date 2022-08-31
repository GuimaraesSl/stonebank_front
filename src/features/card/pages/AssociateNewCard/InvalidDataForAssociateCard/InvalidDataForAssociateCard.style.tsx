import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  alert: {
    marginTop: '100px',
    display: 'flex',
    justifyContent: 'center',
  },
  errorMensage: {
    marginTop: '40px',
    fontWeight: 500,
    fontSize: '14px',
    textAlign: 'center',
    color: colors.system.light.neutral,
  },
  inconsistent: {
    marginTop: '15px',
    fontWeight: 500,
    size: '14px',
    lineHeight: '130%',
    textAlign: 'center',
    color: colors.system.light.neutral,
    LineHeight: '18,2px',
  },
  textDescription: {
    marginTop: '42px',
    height: '48px',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    color: colors.system.light.neutral,
  },
  description: {
    fontSize: '12px',
    textAlign: 'center',
    width: '200px',
    height: '48px',
  },
  button: {
    height: 36,
    fontSize: 12,
    borderRadius: 4,
    textAlign: 'center',
    textTransform: 'none',
    color: colors.system.light.onPrimary,
    backgroundColor: colors.readOnly.light.surface5,
    '&:hover': {
      backgroundColor: colors.readOnly.light.surface5,
    },
  },
  container: {
    textAlign: 'center',
    height: '80%',
    bottom: '40px',
    right: '0px',
    left: '0px',
    position: 'fixed',
  },
})
