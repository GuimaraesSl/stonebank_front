import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  wrapper: {
    padding: 8,
    backgroundColor: colors.readOnly.light.white,
  },
  text: {
    whiteSpace: 'pre-line',
  },
})
