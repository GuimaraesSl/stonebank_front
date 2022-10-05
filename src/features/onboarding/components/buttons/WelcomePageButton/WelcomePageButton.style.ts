import { makeStyles } from '@material-ui/core'
import { colors, theme } from '_config/theme'

export interface StylesProps {
  borderWidth?: 1 | 2
  size?: 'large' | 'normal'
  palette?: 'primary' | 'secondary'
}

export const useStyles = makeStyles({
  button: {
    fontFamily: "'Baloo Bhaina 2', cursiva",
    fontWeight: 700,
    textTransform: 'none',
    borderStyle: 'solid',
    height: ({ size }: StylesProps) => (size === 'large' ? 56 : 46),
    minWidth: ({ size }: StylesProps) => (size === 'large' ? 303 : 196),
    padding: '6px 0 0 0',

    fontSize: ({ size }: StylesProps) =>
      size === 'large' ? '1.125rem' : '0.625rem',

    backgroundColor: ({ palette }: StylesProps) =>
      palette === 'primary' ? colors.readOnly.light.white : 'transparent',

    border: ({ palette }: StylesProps) =>
      palette === 'primary'
        ? 'none'
        : `1px solid ${colors.readOnly.light.white}`,

    borderRadius: 100,

    color: ({ palette }: StylesProps) =>
      palette === 'primary'
        ? colors.readOnly.light.blackLight
        : colors.readOnly.light.white,

    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: colors.readOnly.light.blackLight,
      border: 'none',
    },
  },
})
