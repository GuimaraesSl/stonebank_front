import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  scheduleButton: {
    marginTop: 64,
    justifyContent: 'center',
    '& .MuiFormControl-root': {
      display: 'none',
    },
  },
  schedulingMessage: {
    marginTop: 64,
  },

  grid: {
    marginLeft: '30px',
    marginTop: '20px',
  },
})
