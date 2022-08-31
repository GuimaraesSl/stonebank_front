import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  scheduleButton: {
    marginTop: 64,
    '& .MuiFormControl-root': {
      display: 'none',
    },
  },
  schedulingMessage: {
    marginTop: 64,
  },
})
