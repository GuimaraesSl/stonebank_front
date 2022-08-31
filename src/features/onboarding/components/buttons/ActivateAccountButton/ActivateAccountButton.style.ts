import { makeStyles } from '@material-ui/core'
import { colors, theme } from '_config/theme'

export interface StylesProps {
  borderWidth?: 1 | 2
  size?: 'large' | 'normal'
  palette?: 'primary' | 'white'
}

export const useStyles = makeStyles({
  button: {
    textTransform: 'none',
    borderStyle: 'solid',

    fontSize: ({ size }: StylesProps) =>
      size === 'large' ? '1.20rem' : '0.75rem',
    backgroundColor: ({ palette }: StylesProps) =>
      palette === 'primary'
        ? theme.palette.primary.main
        : colors.readOnly.light.white,
    borderColor: ({ palette }: StylesProps) =>
      palette === 'primary'
        ? colors.readOnly.light.white
        : theme.palette.primary.main,
    borderWidth: ({ borderWidth }: StylesProps) => borderWidth ?? 1,

    color: ({ palette }: StylesProps) =>
      palette === 'primary'
        ? colors.readOnly.light.white
        : theme.palette.primary.main,

    '&:hover': {
      backgroundColor: ({ palette }: StylesProps) =>
        palette === 'primary'
          ? theme.palette.primary.main
          : colors.readOnly.light.white,
      borderColor: ({ palette }: StylesProps) =>
        palette === 'primary'
          ? colors.readOnly.light.white
          : theme.palette.primary.main,
      color: ({ palette }: StylesProps) =>
        palette === 'primary'
          ? colors.readOnly.light.white
          : theme.palette.primary.main,
    },
  },
})
