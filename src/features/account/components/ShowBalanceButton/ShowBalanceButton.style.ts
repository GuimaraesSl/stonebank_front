import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyle = makeStyles({
  showBalanceButton: {
    marginTop: 15,
    fontSize: '10px',
    lineHeight: '95.19%',
    textTransform: 'none',
    color: colors.system.light.background,
    border: `1px solid ${colors.system.light.onPrimary}`,
    width: '95px',

    '&:hover': {
      backgroundColor: 'primary',
      border: '1px solid white',
    },

    '& .MuiButton-label': {
      textAlign: 'left',
    },
  },
  img: {
    marginRight: 8,
  },
})
