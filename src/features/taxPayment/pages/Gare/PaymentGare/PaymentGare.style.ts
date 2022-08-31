import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  content: {
    margin: '0 -16px',
  },
  balanceSubheader: {
    '& #account-balance': {
      fontWeight: 500,
    },
  },
  drawer: {
    '& .MuiDrawer-paper': {
      background: 'transparent',
    },
  },
  scheduleButton: {
    marginTop: 200,
    '& .MuiFormControl-root': {
      display: 'none',
    },
  },
})
