import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  search: {
    backgroundColor: colors.system.light.onPrimary,
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        border: `0.8px solid ${colors.system.light.neutralVariant}`,
      },
      '&:hover fieldset': {
        border: `0.8px solid ${colors.system.light.neutralVariant}`,
      },
    },
  },
})
