import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  detailContent: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: '1.8',
  },

  detailDescription: {
    display: 'flex',
    fontSize: '12px',
  },

  buttonDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '15px',
    marginBottom: '8px',
    paddingRight: '20px',
  },

  detailInfoTagsTags: {
    paddingLeft: '15px',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '12px',
  },

  background: {
    height: '72px',
    padding: '15px 15px 0px 15px',
    backgroundColor: colors.system.light.surface,
    display: 'flex',
    flexDirection: 'column',
  },
})
