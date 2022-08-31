import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  textInput: {
    '& input': {
      color: colors.neutral.shade40,
    },
  },
})
