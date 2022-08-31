import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  button: {
    display: 'flex',
    height: 48,
    width: 172,
    fontSize: 13,
    borderRadius: 50,
    backgroundColor: colors.system.light.primary,
    color: colors.system.light.onPrimary,
    textTransform: 'none',
  },
  img: {
    width: 18,
    marginLeft: 5,
  },
})
