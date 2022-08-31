import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  gridItem: {
    marginTop: '40px',
  },
  alertPassword: {
    color: colors.system.light.error,
    margin: '25px 0 0 10px',
    fontWeight: 500,
    display: 'table',
  },
  alertText: {
    display: 'table-cell',
    verticalAlign: 'middle',
    lineHeight: 1.43,
    position: 'relative',
    paddingLeft: '2px',
  },
})
