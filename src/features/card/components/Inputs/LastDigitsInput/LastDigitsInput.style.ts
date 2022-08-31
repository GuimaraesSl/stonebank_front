import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  passwordInputBody: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '10px',
  },
  passwordInputContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  OtpInput: {
    fontSize: '36px',
    border: `0.8px solid ${colors.neutral.shade30}`,
    color: colors.system.light.neutral,
    width: '45px',
    height: '55px',
  },
})
