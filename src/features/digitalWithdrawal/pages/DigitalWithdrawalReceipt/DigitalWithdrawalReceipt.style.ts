import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  title: {
    fontSize: '20px',
    height: '23px',
    width: '121px',
    lineHeight: '23px',
    fontWeight: 700,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  descriptionBox: {
    ' &  > *': {
      fontSize: '10px',
      color: colors.neutral.shade40,
    },
    marginTop: 20,
  },
  detailContent: {
    width: '100%',
    fontSize: '14px',
    color: '#555555',
  },
  detail: {
    fontWeight: 'bold',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '17px',
    marginRight: '25px',
    lineHeight: '110%',
  },
})
