import { makeStyles } from '@material-ui/core'
import { colors, theme } from '_config/theme'

const buttonHeight = 24
const iconSize = 18

export const useStyles = makeStyles({
  button: {
    position: 'relative',
    backgroundColor: colors.readOnly.light.white,
    color: theme.palette.primary.main,
    height: buttonHeight,
    border: `${colors.system.light.background}`,
    borderRadius: 4,
    '& .MuiButton-label': {
      textTransform: 'none',
      fontSize: 9,
      textAlign: 'center',
    },
  },
  icon: {
    position: 'absolute',
    left: -iconSize / 2,
    top: (buttonHeight - iconSize) / 2,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    height: iconSize,
    width: iconSize,
    borderRadius: 2,
    backgroundColor: colors.system.light.secondary,

    '& img': {
      height: '100%',
      width: '100%',
    },
  },
})
