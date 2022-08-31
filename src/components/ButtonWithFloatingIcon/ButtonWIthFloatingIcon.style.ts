import { makeStyles } from '@material-ui/core'
import { colors, theme } from '_config/theme'
interface ButtonWithFloatingIconStylesProps {
  size?: 'small' | 'medium' | 'large'
}

const buttonHeight = 24
const iconSize = 18

const smallButtonHeight = 20
const smallIconSize = 14
const largeButtonHeight = 40
const largeIconSize = 22
export const useStyles = makeStyles({
  button: {
    padding: '2px',
    position: 'relative',
    backgroundColor: colors.readOnly.light.white,
    color: theme.palette.primary.main,
    height: buttonHeight,
    border: `${colors.system.light.background}`,
    minWidth: '100px',
    fontSize: 9,
    borderRadius: 4,
    '& .MuiButton-label': {
      textTransform: 'none',
      textAlign: 'center',
    },
    '&.MuiButton-sizeSmall': {
      minWidth: '70px',
      fontSize: '9px',
      height: '20px',
    },
    '&.MuiButton-sizeLarge': {
      minWidth: '120px',
      fontSize: '12px',
      height: '40px',
    },
    '&.Mui-disabled': {
      borderColor: theme.palette.action.disabledBackground,
    },
    '&:hover': {
      backgroundColor: colors.readOnly.light.surface5,
    },
  },

  icon: {
    position: 'absolute',
    left: (props: ButtonWithFloatingIconStylesProps) =>
      props.size === 'medium'
        ? -iconSize / 2
        : props.size === 'small'
        ? -smallIconSize / 2
        : -largeIconSize / 2,
    top: (props: ButtonWithFloatingIconStylesProps) =>
      props.size === 'medium'
        ? (buttonHeight - iconSize) / 2
        : props.size === 'small'
        ? (smallButtonHeight - smallIconSize) / 2
        : (largeButtonHeight - largeIconSize) / 2,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    height: (props: ButtonWithFloatingIconStylesProps) =>
      props.size === 'medium'
        ? '18px'
        : props.size === 'small'
        ? '14px'
        : '22px',
    width: (props: ButtonWithFloatingIconStylesProps) =>
      props.size === 'medium'
        ? '18px'
        : props.size === 'small'
        ? '14px'
        : '22px',
    borderRadius: 2,
    backgroundColor: colors.system.light.secondary,
    '& img': {
      height: '100%',
      width: '100%',
    },
  },
})
