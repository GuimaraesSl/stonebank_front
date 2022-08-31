import { makeStyles } from '@material-ui/core'
import { theme } from '_config/theme'

export const useStyles = makeStyles({
  headerWrapper: {
    paddingBottom: '49px',
  },
  footerWrapper: {
    backgroundColor: theme.palette.background.paper,
    margin: '-16px',
    padding: '16px',
  },
  containerOptionReference: {
    position: 'relative',
    height: '100%',
  },
  containerOption: {
    margin: 'auto',
    width: '100%',
    height: '100%',
    overflowY: 'auto',
  },
  cancelCardIconDimension: {
    width: 52,
    height: 49,
  },
  replacementCardIconDimension: {
    width: 52,
    height: 49,
  },
})
