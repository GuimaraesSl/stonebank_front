import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  currentAccount: {
    marginTop: 16,
    backgroundColor: 'transparent',
  },
  seeAllButton: {
    marginBottom: 32,
  },
  cardBackground: {
    backgroundColor: colors.system.light.primaryContainer,
  },
})
