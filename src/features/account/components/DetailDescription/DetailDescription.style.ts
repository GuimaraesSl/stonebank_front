import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyle = makeStyles({
  detailContent: {
    width: '100%',
    marginBottom: '20px',
    flexDirection: 'column',
    justifyContent: 'center',
    color: colors.system.light.neutral,
  },
  transfDetail: {
    fontSize: '12px',
  },
})
