import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  cardTokenContext: {
    marginTop: 20,
  },
  cardLabelToken: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginRight: 250,
    fontWeight: 'bold',
  },
  description: {
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: 12,
    color: '#555',
  },
  tokenInput: {
    fontSize: '30px',
    border: `0.8px solid ${colors.neutral.shade30}`,
    color: colors.system.light.neutral,
    height: '55px',
    width: '42px',
  },
})
