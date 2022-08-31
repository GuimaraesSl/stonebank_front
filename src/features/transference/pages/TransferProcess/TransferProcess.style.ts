import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

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
  img: {
    height: 180,
    width: 250,
  },
  description: {
    color: colors.system.light.neutral,
    fontWeight: 300,
    fontSize: '15px',
    lineHeight: '130%',
    marginTop: '20px',
    textAlign: 'center',
    marginBottom: '30px',
  },
  box: {
    textAlign: 'center',
  },

  detailTransferContent: {
    width: '100%',
    color: '#555555',
    fontSize: '1rem',
  },
  transferDetail: {
    fontSize: '1rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: '17px',
    marginRight: '25px',
    lineHeight: '110%',
    justifyContent: 'center',
  },
})
