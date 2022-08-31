import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyle = makeStyles({
  showBalanceButton: {
    fontSize: '10px',
    positon: 'fixed',
    lineHeight: '95.19%',
    textTransform: 'none',
    color: colors.system.light.onSurface,
    border: `1px solid ${colors.system.light.onSurface}`,
    width: '95px',

    '& .MuiButton-label': {
      textAlign: 'left',
    },
  },
  icon: {
    marginRight: 8,
  },
})
