import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  subheader: {
    marginTop: 8,
    fontWeight: 700,
    color: colors.system.light.neutral,
    '& .MuiTypography-root': {
      fontWeight: 'inherit',
    },
  },
  title: {
    fontSize: 12,
  },
  value: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: 400,
    color: colors.system.light.neutral,
  },
  qrCodeWrapper: {
    padding: '0 64px',
  },
  qrCode: {
    width: '100%',
    flexGrow: 1,
    marginBottom: 24,
  },
})
