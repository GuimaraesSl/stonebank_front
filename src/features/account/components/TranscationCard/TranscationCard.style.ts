import { alpha, makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyle = makeStyles({
  card: {
    position: 'relative',
    marginBottom: 24,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '24px 8px 8px 24px',
    border: 'none',
    boxShadow: `0px 0px 2px ${alpha(
      colors.readOnly.light.black,
      0.12,
    )}, 0px 2px 2px ${alpha(colors.readOnly.light.black, 0.24)}`,
    color: colors.system.light.neutral,
  },
  buttons: {
    position: 'absolute',
    top: -15,
    right: 16,
  },
  description: {
    marginBottom: '1px',
  },
  icon: {
    position: 'absolute',
    left: -10,
  },
})
