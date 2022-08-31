import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    overflow: 'hidden',
    alignItems: 'center',
    backgroundPosition: 'top',
    backgroundSize: '900px',
  },
  img: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    height: '280px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
  },
  welcomeAlignText: {
    width: '250px',
    fontSize: '12px',
    marginTop: '20px',
    textAlign: 'center',
  },
})
