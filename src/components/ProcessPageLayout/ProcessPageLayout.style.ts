import { makeStyles } from '@material-ui/core'
import { colors, theme } from '_config/theme'

const padding = 16

interface StylesProps {
  footerPosition?: 'relative' | 'fixed'
}

export const useStyles = makeStyles<typeof theme, StylesProps>({
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  header: {
    padding: padding,
  },
  main: {
    flex: 1,
    backgroundColor: colors.system.light.surface,
    padding: ({ footerPosition }) =>
      footerPosition === 'fixed'
        ? `${padding}px ${padding}px ${padding + 48}px ${padding}px`
        : padding,
  },
  footer: {
    width: '100%',
    padding: padding,
    position: ({ footerPosition }) => footerPosition ?? 'relative',
    backgroundColor: colors.system.light.surface,
    bottom: 0,
    left: 0,
    right: 0,

    '& .MuiContainer-root': {
      padding: 0,
    },
  },
})
