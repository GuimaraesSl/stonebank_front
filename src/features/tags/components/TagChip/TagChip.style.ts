import { makeStyles } from '@material-ui/core/styles'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 8,
    fontWeight: 'normal',
    letterSpacing: '-5%',
    height: '15px',
    width: '65px',
    lineHeight: 9.38,
    backgroundColor: colors.system.light.background,
    color: colors.system.light.onBackground,
    border: `0.5px solid ${colors.system.light.onBackground}`,
    boxSizing: 'border-box',
    borderRadius: 10,
  },
})
