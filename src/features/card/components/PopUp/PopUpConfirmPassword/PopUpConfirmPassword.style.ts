import { makeStyles, alpha } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  drawer: {
    '& .MuiDrawer-paper': {
      background: 'transparent',
    },
  },
  content: {
    padding: 16,
    backgroundColor: colors.system.light.primary,
    color: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'relative',
    marginTop: 12,
    minHeight: 212,
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: -12,
  },
  OtpInput: {
    minWidth: '40px',
    maxWidth: '45px',
    height: '60px',
    backgroundColor: alpha(colors.readOnly.light.white, 0.4),
    fontSize: 36,
    color: colors.readOnly.light.white,
    border: 'none',
  },
  confirm: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
  passowordtext: {
    marginLeft: 10,
  },
})
