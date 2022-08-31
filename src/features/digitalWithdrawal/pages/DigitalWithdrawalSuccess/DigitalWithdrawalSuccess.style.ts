import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  content: {
    marginTop: '30%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    color: colors.system.light.primary,
    fontWeight: 700,
    fontSize: 36,
    textAlign: 'center',
  },
  img: {
    marginTop: 60,
    width: 80,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
})
