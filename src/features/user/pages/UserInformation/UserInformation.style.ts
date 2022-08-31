import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  header: {
    backgroundColor: colors.system.light.primary,
    padding: '40px 40px 16px 40px',
    margin: '-16px -16px 0 -16px',
  },
  list: {
    marginTop: 48,
  },
})
