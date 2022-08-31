import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  inputCurrency: {
    color: 'red',
    textAlign: 'center',
    '& .MuiOutlinedInput-input': {
      textAlign: 'center',
    },
  },
  labelId: {
    fontSize: '12px',
    paddingLeft: '5px',
    fontWeight: 500,
    color: colors.system.light.neutral,
  },
})
