import { makeStyles } from '@material-ui/core'
import { colors } from '_config'

export const useStyles = makeStyles({
  MuiSvgIcon: {
    '& .stroke': {
      stroke: colors.system.light.primary,
    },
    '& .strokeSecondary': {
      stroke: colors.system.light.secondary,
    },
    '& .primary': {
      fill: colors.system.light.primary,
    },
    '& .secondary': {
      fill: colors.system.light.secondary,
    },
    '& .readOnly.light.white': {
      fill: colors.readOnly.light.white,
    },
    '& .tertiary': {
      fill: colors.system.light.tertiary,
    },
  },
})
