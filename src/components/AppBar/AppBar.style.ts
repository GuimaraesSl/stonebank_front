import { makeStyles } from '@material-ui/core'
import { colors, theme } from '_config/theme'

const toolbarHeight = 48

export const useStyles = makeStyles({
  toolbar: {
    alignItems: 'center',
    background: colors.system.light.primary,
    display: 'flex',
    justifyContent: 'space-between',
    height: toolbarHeight,

    [theme.breakpoints.down('sm')]: {
      height: toolbarHeight,
    },
  },
  cancelButton: {
    marginLeft: '16px',
  },
  logo: {
    height: '100%',
    borderRadius: '0px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    '& img': {
      height: 24,
    },
  },
})
