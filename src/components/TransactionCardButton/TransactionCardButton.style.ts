import { makeStyles } from '@material-ui/core'
import { colors, theme } from '_config/theme'

const buttonHeight = 30
const buttonWidth = 54
const iconSize = 18

export const useStyles = makeStyles({
  button: {
    position: 'relative',
    backgroundColor: colors.readOnly.light.white,
    color: theme.palette.primary.main,
    height: buttonHeight,
    border: `0.5px solid ${colors.system.light.background}`,
    minWidth: buttonWidth,
    fontSize: 8,
    borderRadius: 6,
    padding: '0px',
    paddingTop: '10px',
    fontWeight: 'bold',
    '& .MuiButton-label': {
      textTransform: 'none',
      textAlign: 'center',
    },
    '&.Mui-disabled': {
      borderColor: theme.palette.action.disabledBackground,
    },
  },

  icon: {
    position: 'absolute',
    left: buttonWidth - iconSize * 2,
    top: (iconSize - buttonHeight) / 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '16px',
    width: '16px',
    borderRadius: 2,
    backgroundColor: colors.system.light.secondary,
    '& img': {
      height: '100%',
      width: '100%',
    },
  },
})
