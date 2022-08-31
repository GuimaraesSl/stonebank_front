import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  otpInput: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    '& *': {
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      boxSizing: 'border-box',
      borderRadius: '3px',
      outline: 'none',
    },
  },
})
