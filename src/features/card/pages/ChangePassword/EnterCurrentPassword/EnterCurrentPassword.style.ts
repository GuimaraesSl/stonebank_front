import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  header: {
    height: '144px',
    width: '246px',
  },
  main: {
    paddingTop: '11px',
  },
  inputValid: {
    border: '2px solid green',

    boxShadow: '0 0 5px green',
  },

  inputInvalid: {
    border: '2px solid red',

    boxShadow: '0 0 5px red',
  },
})
