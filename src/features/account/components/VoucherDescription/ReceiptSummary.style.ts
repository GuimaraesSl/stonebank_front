import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  voucherContent: {
    width: '100%',
    marginTop: '20px 0',
    flexDirection: 'column',
    justifyContent: 'center',
    color: colors.system.light.neutral,
  },
})
