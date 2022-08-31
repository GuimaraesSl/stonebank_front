import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyle = makeStyles({
  transactionsContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  transactionDay: {
    width: '35px',
    border: `1px solid ${colors.system.light.outline}`,
    borderRight: 'none',
    marginRight: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'initial',
  },
  transactionDate: {
    top: '0px',
    textAlign: 'center',
    color: colors.system.light.neutral,
  },
  transactionsHistory: {
    width: '100%',
  },
  balanceCurrent: {
    display: 'flex',
    flexDirection: 'row-reverse',
    marginTop: -20,
    marginBottom: 24,
    fontSize: '10px',
    color: colors.system.light.onSurface,
  },
})
