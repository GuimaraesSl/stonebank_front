import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  subInformation: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.system.light.primary,
  },
  value: {
    marginTop: 9,
    fontSize: 24,
    fontWeight: 700,
    color: colors.system.light.primary,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  bank: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.system.light.primary,
    marginTop: 16,
  },
  instructions: {
    fontSize: 10,
    fontWeight: 400,
    color: colors.neutral.shade40,
    marginTop: 17,
  },
  instructionsSub: {
    fontSize: 10,
    fontWeight: 700,
    color: colors.neutral.shade40,
  },
  rateValue: {
    fontSize: 10,
    color: colors.neutral.shade40,
    fontWeight: 400,
  },
  btnReadQrCode: {
    marginTop: 20,
  },
})
