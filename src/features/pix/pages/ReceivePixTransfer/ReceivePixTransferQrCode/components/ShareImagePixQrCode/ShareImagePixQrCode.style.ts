import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  drawer: {
    '& .MuiDrawer-paper': {
      background: 'transparent',
    },
  },
  content: {
    padding: '16px',
    marginTop: '12px',
    minHeight: '212px',
    position: 'relative',
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
    color: colors.readOnly.light.white,
    backgroundColor: colors.system.light.primary,
  },
  closeButton: {
    top: '-12px',
    right: '16px',
    position: 'absolute',
  },
  buttonsRow: {
    marginBottom: '24px',
  },
  subtitle: {
    opacity: '0.9px',
    textAlign: 'center',
    fontSize: '15px',
    width: '50px',
  },
  title: {
    textAlign: 'center',
    fontSize: '18px',
  },
  qrCode: {
    width: '100%',
  },
  qrCodeWrapper: {
    padding: '0 64px',
  },
  name: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
