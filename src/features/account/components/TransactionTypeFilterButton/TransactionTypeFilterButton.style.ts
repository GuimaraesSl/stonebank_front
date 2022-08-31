import { makeStyles } from '@material-ui/core'
import { colors } from '_config'
import check from '_assets/icons/Check.svg'

export const useStyles = makeStyles({
  label: {
    color: colors.system.light.neutral,
    fontWeight: 500,
  },

  mainIcon: {
    alignItems: 'center',
    backgroundColor: colors.system.light.surface,
    borderRadius: 8,
    boxShadow: '0px 2px 2px 0px #00000026',
    display: 'flex',
    height: 16,
    justifyContent: 'center',
    position: 'relative',
    width: 16,

    '& img': {
      height: 12,
      width: 12,
    },
  },

  selectedIcon: {
    backgroundColor: colors.system.light.secondary,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '14px',
    borderRadius: 5,
    height: 10,
    position: 'absolute',
    right: '-5px',
    top: '-5px',
    width: 10,
  },
})
