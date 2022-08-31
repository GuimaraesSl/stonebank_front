import { alpha, makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyle = makeStyles({
  button: {
    display: 'flex',
    justifyContent: 'center',
    padding: '8px',
    backgroundColor: colors.readOnly.light.white,
    borderRadius: '10px',
    boxShadow: `0px 4px 4px ${alpha(colors.readOnly.light.black, 0.25)}`,
    height: 80,
    width: 88,
  },
  icon: {
    height: '40px',
    width: '70px',
  },
  label: {
    fontSize: "10px",
    color: colors.neutral.shade40,
    textTransform: "none",
  },
})
