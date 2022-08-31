import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  container: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginLeft: '5px',
    color: `${colors.system.light.error} !important`,
    fontSize: '10px',
  },
  alert: {
    width: '16px',
    height: '16px',
  },
})
