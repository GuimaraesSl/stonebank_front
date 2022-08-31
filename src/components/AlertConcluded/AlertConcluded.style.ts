import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyle = makeStyles({
  drawer: {
    '& .MuiDrawer-paper': {
      background: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
  },
  imgconc: {
    width: '90%',
  },
  alertcontainer: {
    backgroundColor: colors.system.light.surface,
    width: '90%',
    height: 164,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  txtalert: {
    fontSize: 20,
    fontWeight: 700,
    marginTop: 10,
  },
  imgalert: {
    width: 63,
    height: 60,
  },
})
