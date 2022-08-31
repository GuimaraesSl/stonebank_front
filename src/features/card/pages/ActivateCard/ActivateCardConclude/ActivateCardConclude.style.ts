import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  container: {
    padding: '0px',
    marginBottom: '0px',
    background: 'white',
    height: '568px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxAccessAccountAlignButton: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '20%',
    alignItems: 'center',
  },
  accessAccountAlignButton: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15%',
  },
  title: {
    fontSize: '20',
    fontWeight: 'bold',
    marginTop: '10%',
    marginLeft: '10%',
  },
  image: {
    marginTop: '25%',
    marginLeft: '5%',
    justifyContent: 'center',
  },
  icon: {
    width: '100%',
  },
})
