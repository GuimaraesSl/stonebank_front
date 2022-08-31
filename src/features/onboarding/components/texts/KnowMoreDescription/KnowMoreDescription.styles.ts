import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  description: {
    fontWeight: 200,
  },
  link: {
    textDecoration: 'none',
    color: colors.readOnly.light.white,
    fontWeight: 'bold',
  },
})
