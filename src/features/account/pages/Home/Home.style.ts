import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  pageContainer: {
    backgroundColor: colors.system.light.background,
  },
  header: {
    zIndex: 1,
  },
  buttonsRow: {
    backgroundColor: 'white',
    padding: '41px 16px 16px 16px',
    marginTop: -25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  descriptionText: {
    marginTop: -18,
  },
  formFooterHome: {
    bottom: '16px',
    left: '19px',
    right: '16px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '5px',
    position: 'fixed',
  },
  invisibleButton: {
    width: 96,
    '& > *': {
      display: 'none',
    },
  },
  drawer: {
    '& .MuiDrawer-paper': {
      background: 'transparent',
    },
  },
  contentTopUp: {
    marginTop: 12,
  },
})
