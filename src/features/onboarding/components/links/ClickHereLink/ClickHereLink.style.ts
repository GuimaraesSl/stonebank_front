import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyle = makeStyles({
  clickHereLink: {
    color: colors.readOnly.light.white,
    height: '36px',
  },
  clickHere: {
    color: colors.readOnly.light.white,
    fontWeight: 500,
  },
})
