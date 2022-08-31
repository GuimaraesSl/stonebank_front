import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  content: {
    height: '100%',
  },
  alignText: {
    marginRight: '35px',
    marginLeft: '15px',
  },
  buttons: {
    marginBottom: '10px',
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    '& .MuiButton-label': {},
  },
  authenticationDetails: {
    display: 'flex',
    fontSize: '10px',
    marginTop: '10px',
    paddingLeft: '15px',
    backgroundColor: '#FFFFFF',
  },
  footer: {
    width: '100%',
    display: 'flex',
    bottom: 0,
    right: 0,
    left: 0,
    padding: 30,
    position: 'absolute',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
})
