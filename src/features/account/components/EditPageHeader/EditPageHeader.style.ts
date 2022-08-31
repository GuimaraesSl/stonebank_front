import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

const borderRadius = 12

export const useStyle = makeStyles({
  mainHeader: {
    position: 'relative',
    width: '100%',
    height: '169px',
    backgroundColor: colors.system.light.surface,
    borderRadius: `0 0 ${borderRadius}px ${borderRadius}px`,
    overflow: 'visible',
  },
  greetingsSection: {
    marginBottom: 16,

    '& .MuiTypography-root': {
      fontSize: 18,
      fontWeight: 700,
    },
  },
  bottomFloatingButton: {
    position: 'absolute',
    left: 25,
    bottom: -12,
  },
  toolbar: {
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: '-23px',
    textTransform: 'none',
    backgroundColor: colors.readOnly.light.white,
  },
})
