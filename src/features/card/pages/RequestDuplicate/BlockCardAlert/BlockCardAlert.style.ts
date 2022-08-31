import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  description: {
    height: 144,
  },
  imageReference: {
    position: 'relative',
  },
  image: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    top: '-25px',
  },
  attention: {
    fontSize: 18,
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
  },
  cardtext: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    color: colors.system.light.neutral,
  },
  cardtext2: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
    color: colors.system.light.neutral,
  },
  spanBreakLine: {
    display: 'block',
  },
})
