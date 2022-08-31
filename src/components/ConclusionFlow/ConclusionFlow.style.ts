import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  content: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: '36px',
    fontWeight: 700,
    textAlign: 'center',
    margin: '40px 0',
  },
  containerImg: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '45vh',
  },
  img: {
    height: 200,
  },
})
