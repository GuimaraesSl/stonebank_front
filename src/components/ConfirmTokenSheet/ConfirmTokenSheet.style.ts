import { alpha, makeStyles } from '@material-ui/core'
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
  inputRow: {
    '& div[class="input"]:not(:last-of-type)': {
      marginRight: '12px',
    },
    '& div[class="input"]': {
      flex: '1',
      display: 'flex',
      '& input': {
        flex: '1',
        height: '72px',
        border: 'none',
        outline: 'none',
        fontSize: '24px',
        borderRadius: '4px',
        color: colors.readOnly.light.white,
        backgroundColor: alpha(colors.readOnly.light.white, 0.4),
      },
    },
  },
  buttonsRow: {
    marginBottom: '24px',
  },
  subtitle: {
    opacity: '0.9px',
  },
})
