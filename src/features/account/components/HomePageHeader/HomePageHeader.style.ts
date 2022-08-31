import { makeStyles } from '@material-ui/core'
import { colors, theme } from '_config/theme'

export const useStyle = makeStyles({
  mainHeader: {
    position: 'relative',
    width: '100%',
    color: colors.readOnly.light.white,
    backgroundColor: theme.palette.primary.main,
    borderRadius: `0px 0px 12px 12px`,
    boxShadow: `0px 2px 4px rgba(0, 0, 0, 0.25);`,

    '& > .MuiCardContent-root': {
      paddingBottom: 25,
    },
  },

  greetingsSection: {
    marginBottom: 16,

    '& .MuiTypography-root': {
      fontSize: 18,
      fontWeight: 700,
    },
  },

  bottomFloatingButton: {
    position: 'absolute',
    left: 25,
    bottom: -8,
  },

  toolbar: {
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    height: 24,
  },
})
