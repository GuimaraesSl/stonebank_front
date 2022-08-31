import { makeStyles } from '@material-ui/core'
import { colors, theme } from '_config/theme'

export interface StylesProps {
  borderWidth?: 1 | 2
  size?: 'large' | 'normal'
  palette?: 'primary' | 'secondary'
}

export const useStyles = makeStyles({
  button: {
    textTransform: 'none',
    borderStyle: 'solid',
    height: ({ size }: StylesProps) => (size === 'large' ? 48 : 38),
    minWidth: ({ size }: StylesProps) => (size === 'large' ? 280 : 170),

    fontSize: ({ size }: StylesProps) =>
      size === 'large' ? '1.25rem' : '0.75rem',
    backgroundColor: ({ palette }: StylesProps) =>
      palette === 'primary' ? colors.readOnly.light.white : 'transparent',

    border: ({ palette }: StylesProps) =>
      palette === 'primary'
        ? 'none'
        : `1px solid ${colors.readOnly.light.white}`,

    color: ({ palette }: StylesProps) =>
      palette === 'primary'
        ? colors.readOnly.light.black
        : colors.readOnly.light.white,

    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: colors.readOnly.light.black,
      border: 'none',
    },
  },
})
