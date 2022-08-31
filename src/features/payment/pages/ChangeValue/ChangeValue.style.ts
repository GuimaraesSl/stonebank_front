import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  marginHeader: {
    marginTop: '20px',
    marginBottom: '-15px',
  },
  subtitle: {
    fontWeight: 700,
    fontSize: 16,
    lineHeight: '16px',
  },
  customTexts: {
    textAlign: 'center',
    color: colors.system.light.neutral,
    marginLeft: '4%',
    marginRight: '4%',
    lineHeight: '9px',
  },
  customInput: {
    marginTop: '10px',
    marginBottom: '8px',
  },
  dueDate: {
    fontSize: '12px',
    fontWeight: 500,
  },
})
