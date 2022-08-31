import { makeStyles, Theme } from '@material-ui/core'
import { colors } from '_config/theme'

export interface ButtonStylesProps {
  variant?: 'outlined' | 'contained' | 'text'
  size?: 'small' | 'medium'
  palette?: 'primary' | 'secondary'
}

export const useStyles = makeStyles<Theme, ButtonStylesProps, 'button'>({
  button: {
    height: 36,
    fontSize: 12,
    borderRadius: 4,
    backgroundColor: ({ palette, variant }) => {
      switch (variant) {
        case 'contained':
          return palette === 'primary'
            ? colors.system.light.primary
            : colors.readOnly.light.white

        case 'outlined':
          return 'transparent'

        default:
          return undefined
      }
    },
    border: ({ palette, variant }) => {
      switch (variant) {
        case 'contained':
          return '0.5px solid transparent'

        default:
          return palette === 'primary'
            ? colors.system.light.primary
            : colors.readOnly.light.white
      }
    },
    color: ({ palette, variant }) => {
      switch (variant) {
        case 'contained':
          return palette === 'primary'
            ? colors.readOnly.light.white
            : colors.system.light.primary

        default:
          return `0.5px solid ${
            palette === 'primary'
              ? colors.system.light.primary
              : colors.system.light.secondary
          }`
      }
    },

    '& .MuiButton-label': {
      textTransform: 'none',
      textAlign: 'center',
    },
    '&.MuiButton-sizeSmall': {
      fontSize: 10,
      height: 26,
    },
    '& .MuiButton-iconSizeSmall': {
      '& > *:first-child, & > *:last-child': {
        fontSize: 14,
      },
    },
    '&.MuiButton-sizeLarge': {
      minWidth: 120,
      fontSize: 12,
      height: 40,
    },
  },
})
