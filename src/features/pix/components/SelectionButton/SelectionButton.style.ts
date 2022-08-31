import { alpha, makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  Button: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 0,
    boxShadow: `0px 2px 2px 0px ${alpha(
      colors.readOnly.light.black,
      0.24,
    )}, 0px 0px 2px 0px ${alpha(colors.readOnly.light.black, 0.12)}`,
    cursor: 'pointer',
  },
  endIcon: {
    height: 36,
    width: 36,
  },
  text: {
    color: colors.source.neutral,
    paddingRight: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: 500,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 400,
    marginTop: 4,

    '& > *': {
      fontSize: 12,
      fontWeight: 400,
    },
  },
  icon: {
    height: 32,
    width: 32,
    marginRight: 5,

    '& *': {
      height: '100%',
    },
  },
  qrCodeButton: {
    fontSize: 20,
    marginTop: -23,
  },
})
