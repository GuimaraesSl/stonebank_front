import { makeStyles, alpha } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  actionListItem: {
    minHeight: 50,
    fontSize: 12,
    lineHeight: '14.06px',
    color: 'black',
    borderBottom: `0.5px solid ${alpha(colors.neutral.shade30, 0.6)}`,
    padding: 0,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    margin: '15px 0px',
  },
  items: {
    display: 'flex',
    flexDirection: 'row',
    '& img': {
      width: 18,
    },
  },
  title: {
    fontSize: '12px',
    fontWeight: 300,
    marginLeft: 13,
    color: colors.system.light.neutral,
  },
  details: {
    fontSize: '12px',
    lineHeight: '14.06px',
    color: colors.system.light.neutral,
    fontWeight: 500,
    marginTop: 10,
  },
})
