import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  detailTransferDescription: {
    paddingLeft: '10px',
    paddingRight: '15px',
    display: 'flex',
    marginleft: '-10px',
    marginTop: '15px',
    fontSize: '12px',
    fontWeight: 300,
  },
  buttonDetailsTransfer: {
    display: 'flex',
    width: '100%',
    height: '15px',
    marginTop: '5px',
    justifyContent: 'spaceBetween',
  },
  buttonTransfer: {
    width: '48%',
    marginRight: '4%',
    marginLeft: '2%',
  },
  contentValue: {
    height: 'auto',
    marginTop: '4%',
  },
  detailInfoTagsSummary: {
    height: '15px',
    marginTop: '61px',
    marginBottom: '15%',
  },
  tagsSummaryProps: {
    marginLeft: '15px',
    marginTop: '-20px',
    height: '15px',
  },
  scrollSummary: {
    overflowY: 'scroll',
    height: '54vh',
  },
})
