import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  headerContent: {
    '& #pd-description': {
      width: 130,
      marginTop: 8,
      marginBottom: 13,
      lineHeight: '18.2px',
    },
  },
  viewBalance: {
    marginTop: '-27px',
  },
  operatorView: {
    paddingTop: 20,
    padding: 10,
    fontWeight: 500,
    display: 'flex',
    flexDirection: 'column',
  },
  iconOperator: {
    width: 50,
    height: 13,
    marginTop: 10,
    marginLeft: 5,
  },
  txtOperator: {
    fontSize: 13,
    fontWeight: 500,
    color: colors.system.light.neutral,
  },
  list: {
    margin: '-16px',
    marginTop: 12,
  },
  spantext: {
    fontSize: 13,
    fontWeight: 500,
    color: colors.system.light.neutral,
  },
  valueTopUp: {
    fontSize: 14,
    color: colors.system.light.neutral,
    fontWeight: 500,
  },
  validateTopUp: {
    fontSize: 10,
    fontWeight: 300,
    marginTop: '-3px',
    color: colors.neutral.shade40,
  },
  listItem: {
    boxShadow:
      '0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24)',
    borderTop: '1px solid #CFCFCF',
    height: 80,
    '& .MuiListItemText-multiline': {
      paddingLeft: 7,
      marginTop: 4,
      marginBottom: 4,
    },
  },
  selectValue: {
    fontSize: '9px',
    color: '#333750',
    fontWeight: 400,
    marginTop: '6px',
    width: '44px',
  },
  blocktext: {
    display: 'block',
  },
  validator: {
    marginTop: '27px',
  },
})
