import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',

    '& .MuiButton-root': {
      minWidth: 136,
      borderRadius: 10,
    },
    '& .MuiButton-label': {
      display: 'block',
      position: 'relative',
    },
    '& .MuiButton-startIcon, & .MuiButton-endIcon': {
      display: 'block',
      position: 'absolute',
    },
    '& .MuiButton-startIcon': {
      top: 0,
      left: 0,
      marginRight: 8,
    },
    '& .MuiButton-endIcon': {
      marginLeft: 8,
      top: 0,
      right: 0,
    },
  },
})
