import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  container: {
    '& main': {
      backgroundColor: 'inherit',
      display: 'flex',
      padding: '0 32px',
    },
  },

  toolbar: {
    alignItems: 'center',
    display: 'flex',

    '& #title': {
      fontSize: 20,
      fontWeight: 700,
    },

    '& #skip-button': {
      marginLeft: 'auto',
      width: 80,
    },
  },

  slide: {
    flexGrow: 1,
  },

  footerButton: {
    borderRadius: 8,
  },
})
