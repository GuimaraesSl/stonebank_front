import { makeStyles } from '@material-ui/core'
import { colors, theme } from '_config/theme'

export interface StylesProps {
  borderWidth?: 1 | 2
  size?: 'large' | 'normal'
  palette: 'primary' | 'secondary'
}

// primary : {back: colors.syten.light.primary || color: colors.readOnly.light.white}
// secondary : {back: colors.readOnly.light.white || color: colors.readOnly.light.blackLight}
// else: {'transparent'}


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

    backgroundColor: ({ palette }: StylesProps) => {
        if(palette === 'primary'){
          return colors.system.light.primary
        } else if (palette === 'secondary') {
          return colors.readOnly.light.white
        } else {
          return 'transparent'
        }
    },
      // palette === 'primary' ? colors.readOnly.light.white : 'transparent',

    border: ({ palette }: StylesProps) => {
      if(palette === 'primary' || palette === 'secondary'){
        return 'none'
      } else {
        return `1px solid ${colors.readOnly.light.white}`
      }
    },

    borderRadius: 100,

    color: ({ palette }: StylesProps) => {
      if(palette === 'primary'){
        return colors.readOnly.light.white
      } else {
        return colors.readOnly.light.blackLight
      } 
    },

    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: colors.readOnly.light.blackLight,
      border: 'none',
    },
  },
})
