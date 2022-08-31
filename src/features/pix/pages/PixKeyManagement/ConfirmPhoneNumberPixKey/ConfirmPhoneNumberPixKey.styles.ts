import { colors } from '_config/theme'
import { makeStyles } from '@material-ui/core'
export const useStyles = makeStyles({
  tokenInput: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    '& input': {
      marginRight: 5,
      marginLeft: 4,
      fontSize: 40,
      border: '0.8px solid #c4c4c4',
      boxSizing: 'border-box',
      borderRadius: 3,
      width: '41.95px',
      height: 51,
    },
    minWidth: '40px',
    maxWidth: '45px',
    height: '60px',
    fontSize: '36px',
    color: colors.readOnly.light.white,
    border: 'none',
  },
  label: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.neutral.shade40,
  },
  boxContent: {
    display: 'grid',
    justifyContent: 'center',
  },
  buttonWithFloatingIcon: { marginTop: '70px' },
  footer: { display: 'flex', justifyContent: 'space-between' },
})
