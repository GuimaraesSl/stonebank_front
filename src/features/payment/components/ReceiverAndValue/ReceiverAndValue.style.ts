import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  receiverAndValue: {
    textAlign: 'center',
  },
  receiver: {
    fontWeight: 700,
    fontSize: '12px',
    color: colors.system.light.neutral,

    '& + #pd-value': {
      marginTop: '-2px',
    },
  },
  value: {
    fontWeight: 700,
    fontSize: '24px',
    color: colors.system.light.neutral,
  },
})
