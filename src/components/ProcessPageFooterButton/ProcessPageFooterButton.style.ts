import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  button: {
    '& .MuiButton-label': {
      display: 'inherit',
      position: 'relative',
      alignItems: 'center',
    },
    '& .MuiButton-root': {
      minWidth: '136px',
      borderRadius: '10px',
    },
    '& .MuiButton-startIcon, & .MuiButton-endIcon': {
      display: 'block',
      position: 'absolute',
    },
    '& .MuiButton-startIcon': {
      left: '0px',
      marginRight: '8px',
    },
    '& .MuiButton-endIcon': {
      marginLeft: '8px',
      right: '0px',
    },
  },
})
