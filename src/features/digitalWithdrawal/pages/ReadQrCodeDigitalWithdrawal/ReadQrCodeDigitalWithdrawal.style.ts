import { makeStyles } from '@material-ui/core'
import { theme } from '_config/theme'

export const useStyles = makeStyles({
  container: {
    margin: 'auto',
  },
  main: {
    margin: -theme.spacing(2),
    marginBottom: -23,
  },
})
