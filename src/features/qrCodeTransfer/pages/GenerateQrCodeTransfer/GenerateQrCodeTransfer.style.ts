import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '-70px',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.system.light.neutral,
  },
  input: {
    width: '100%',
    border: 'none',
    fontWeight: 700,
    fontSize: 24,
    textAlign: 'center',
    color: colors.system.light.neutral,
    backgroundColor: colors.system.light.primaryContainer,

    '&:focus': {
      outline: 'none',
      backgroundColor: colors.system.light.primaryContainer,
    },
  },
  content: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '5%',
  },
  error: {
    color: colors.system.light.error,
    fontWeight: 700,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
})
