import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyle = makeStyles({
  drawer: {
    '& .MuiDrawer-paper': {
      background: 'transparent',
    },
  },
  imgError: {
    width: '100%',
  },
  alertContainer: {
    backgroundColor: colors.system.light.surface,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    borderRadius: '20px 20px 0 0',
    minHeight: '212px',
  },
  textContainer: {
    position: 'static',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '0 40px 0 40px',
  },
  textError: {
    fontWeight: 500,
    color: colors.system.light.primary,
    wordBreak: 'break-word',
    textAlign: 'center',
    fontSize: '14px',
  },
  textAlert: {
    color: colors.system.light.neutral,
    wordBreak: 'break-word',
    textAlign: 'center',
    fontSize: '14px',
    margin: '10px 0px 8px 0px',
  },
  buttonRow: {
    margin: '3% 0 6% 0',
    '& .MuiButton-root': {
      padding: '24px 77px',
      borderRadius: '10px',
      fontSize: '16px',
    },
  },
  imgAlert: {
    width: '162px',
    height: '163px',
  },
})
