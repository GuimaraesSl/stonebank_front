import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  accountTypeHeader: {
    marginTop: '24px',
    marginBottom: '16px',
    '& .MuiTypography-root': {
      fontWeight: 500,
    },
  },
  selectionCards: {
    margin: '0 -16px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
})
