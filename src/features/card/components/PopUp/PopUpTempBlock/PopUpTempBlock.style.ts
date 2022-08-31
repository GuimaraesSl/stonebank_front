import { makeStyles, alpha } from '@material-ui/core'
import { colors } from '_config/theme'
export const useStyle = makeStyles({
  containerPopUp: {
    width: '100%',
    height: 212,
    backgroundColor: colors.system.light.primary,
    position: 'absolute',
    padding: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    boxShadow: '0px -2px 8px rgba(0, 0, 0, 0.2)',
  },
  boxbtnclose: {
    position: 'absolute',
    right: 15,
    marginTop: '-15px',
  },
  containerText: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 39,
  },
  confirm: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.system.light.onPrimary,
    fontSize: 16,
    marginTop: 10,
  },
  textBlock: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '16.41px',
    color: colors.system.light.onPrimary,
    width: 190,
    transform: 'scale(0.973683,0.974619)',
  },
  subtextBlock: {
    marginTop: 14,
    fontSize: 12,
    lineHeight: '14.06px',
    color: colors.system.light.onPrimary,
    width: 268,
    fontWeight: 300,
    transform: 'scale(0.979524, 1.030807)',
  },
  contentbutton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  drawer: {
    '& .MuiDrawer-paper': {
      background: 'transparent',
      boxShadow: 'none',
    },
  },
  content: {
    padding: 16,
    backgroundColor: colors.system.light.primary,
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
  buttonsRow: {
    marginBottom: 24,
  },
  subtitle: {
    opacity: 0.9,
  },
})
