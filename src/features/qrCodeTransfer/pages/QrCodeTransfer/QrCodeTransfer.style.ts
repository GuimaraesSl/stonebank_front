import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  main: {
    margin: '0 -16px',

    '& .MuiPaper-root:first-of-type': {
      marginBottom: 1,
    },
  },
})
