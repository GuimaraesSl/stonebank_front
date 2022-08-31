import { alpha, makeStyles } from '@material-ui/core'
import { white } from 'colors'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  drawer: {
    '& .MuiDrawer-paper': {
      background: 'transparent',
    },
  },
  content: {
    padding: '16px',
    marginTop: '12px',
    minHeight: '212px',
    position: 'relative',
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
    color: colors.readOnly.light.surface,
    backgroundColor: colors.readOnly.light.white,
  },
  closeButton: {
    top: '-12px',
    right: '16px',
    position: 'absolute',
  },
  buttonsRow: {
    marginBottom: '24px',
  },
  subtitle: {
    opacity: '0.9px',
    textAlign: 'center',
    fontSize: '15px',
  },
  title: {
    textAlign: 'center',
    fontSize: '18px',
    marginBottom: '10px',
  },
  receiverSection: {
    '& #receiver-info-card': {
      margin: '0 -16px',
      marginTop: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
  },

  muiInputBaseinput: {
    paddingRight: '8px',
    textAlign: 'right',
    marginRight: 'auto',
    marginTop: '15px',
  },
})
