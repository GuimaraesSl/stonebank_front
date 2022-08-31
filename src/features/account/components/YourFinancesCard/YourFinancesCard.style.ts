import { alpha, makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyle = makeStyles({
  card: {
    minWidth: '80px',
    height: 32,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0px 8px 0px 16px',

    backgroundColor: colors.readOnly.light.white,
    borderRadius: '5px',
    boxShadow: `0px 0px 2px ${alpha(
      colors.readOnly.light.black,
      0.12,
    )}, 0px 2px 2px ${alpha(colors.readOnly.light.black, 0.24)}`,
    color: colors.system.light.neutral,

    '& .MuiTypography-caption': {
      fontSize: 9,
      lineHeight: '13px',
    },
    '& .MuiTypography-body2': {
      fontSize: 11,
      lineHeight: '11px',
    },
  },
  icon: {
    position: 'absolute',
    left: -8,
    top: 8,
    width: '16px',
    height: '16px',
    backgroundColor: colors.readOnly.light.white,
    borderRadius: '50%',

    '& img': {
      height: '100%',
      width: '100%',
    },
  },
  wrapper: {
    position: 'relative',
  },
})
