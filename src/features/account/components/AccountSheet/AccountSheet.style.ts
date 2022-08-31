import { alpha, makeStyles } from '@material-ui/core'
import { DividerStylesProps } from 'components/Divider/Divider.style'
import { colors, theme } from '_config/theme'

interface StyleProps {
  expandClass: boolean
}

export const useStyles = makeStyles<StyleProps>({
  containerPopUp: {
    height: '100%',
    width: '100%',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    backgroundColor: colors.system.light.primary,
    zIndex: 1,
  },

  accounts: {
    paddingRight: '32px',
    paddingTop: '16px',
    paddingLeft: '24px',
    maxHeight: '150px',
    width: '100%',
    overflow: 'hidden',
  },

  divider: {
    margin: ({ spacing }: DividerStylesProps) => {
      const verticalMargin = theme.spacing(spacing ?? 1)
      return `${verticalMargin}px 0`
    },
    height: 1,
    backgroundColor: colors.system.light.neutralVariant,
  },

  expanded: {
    maxHeight: '100%',
  },

  separatorAllAccounts: {
    listStyle: 'none',
    marginTop: '0px',
    marginBottom: '8px',
    marginLeft: '5px',
    width: '100%',
    borderBottom: alpha(colors.system.light.outline, 0.5),
  },
  closeButton: {
    position: 'absolute',
    right: 24,
    top: 0,
    // transform: "translate(0%,50%)",
    zIndex: theme.zIndex.drawer + 1,
  },
  buttonShowMore: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
  },
  showMore: {
    top: -10,
    color: colors.readOnly.light.white,
    backgroundColor: colors.system.light.onBackground,
    '&:hover': {
      '& .MuiButton-label': {
        color: colors.system.light.primary,
      },
      backgroundColor: colors.system.light.onBackground,
    },
    '& img': {
      backgroundColor: colors.system.light.onBackground,
    },
  },
  drawer: {
    position: 'relative',
    '& .MuiDrawer-paper': {
      paddingTop: 13,
      background: 'transparent',
    },
  },
})
