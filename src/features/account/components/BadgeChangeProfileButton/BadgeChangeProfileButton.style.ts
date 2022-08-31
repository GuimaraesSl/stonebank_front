import { alpha, makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyle = makeStyles({
  bgEditButton: {
    width: '100%',
    maxWidth: '70px',
    height: '20px',
    padding: '2px',
    backgroundColor: colors.readOnly.light.white,
    border: `0.5px solid ${colors.system.light.background}`,
    borderRadius: '4px',
    '& .MuiButton-label': {
      textTransform: 'none',
      textAlign: 'center',
    },
    boxShadow: `0px 0px 2px ${alpha(
      colors.readOnly.light.black,
      0.12,
    )}, 0px 2px 2px ${alpha(colors.readOnly.light.black, 0.24)}`,
    '&:hover': {
      borderWidth: '2',
    },
  },
  propButton: {
    fontSize: '9px',
    marginRight: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  iconBgButton: {
    display: 'absolute',
    width: '14px',
    height: '14px',
    marginLeft: '-7px',
  },
  label: {
    width: '60px',
  },
})
