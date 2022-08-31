import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  pageContainer: {
    position: 'relative',
    minHeight: '100%',
    padding: 0,

    '&.MuiContainer-root': {
      height: 'auto',
    },
  },
})
