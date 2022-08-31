import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  drawer: {
    '& .MuiDrawer-paper': {
      background: 'transparent',
    },
  },
  scheduleButton: {
    marginTop: 64,
    '& .MuiFormControl-root': {
      display: 'none',
    },
  },
})
