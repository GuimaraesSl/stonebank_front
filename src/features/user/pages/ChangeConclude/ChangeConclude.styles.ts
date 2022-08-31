import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',

    '& > main': {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
    },
  },
  image: {
    height: 128,
  },
})
