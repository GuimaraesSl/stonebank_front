import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  featuresCard: {
    display: 'flex',
    backgroundColor: colors.readOnly.light.white,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    padding: '24px 16px 36px 16px',
    flexWrap: 'nowrap',
  },
})
