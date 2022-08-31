import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  description: {
    width: '100%',
    paddingLeft: '15px',
    paddingRight: '15px',
    height: '100%',
    minheight: '250px',
    display: 'flex',
    flexdirection: 'column',
    fontSize: '14px',
    marginTop: '20px',
  },

  footer: {
    backgroundColor: colors.system.light.surface,
    marginTop: '15px',
    marginLeft: '5px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  separator: {
    listStyle: 'none',
    padding: 0,
    fontSize: '0.75rem',
    width: '100%',
    borderBottom: `1.5px solid ${colors.system.light.outline}`,
    marginBottom: '11px',
  },
  bottom: {
    paddingLeft: '15px',
    paddingBottom: '15px',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '10px',
    borderTop: colors.system.light.surface,
    paddingTop: '8px',
  },
})
