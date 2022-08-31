import { alpha, makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  mainContainer: {
    writingMode: 'vertical-lr',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '100vh',
    position: 'absolute',
    zIndex: 1,
    boxSizing: 'border-box',
  },
  containerfooter: {
    display: 'flex',
    margin: 0,
    background: `${alpha(colors.system.light.primary, 0.5)}`,
    height: '100%',
    justifyContent: 'center',
  },
  typeText: {
    margin: '2%',
  },
})
