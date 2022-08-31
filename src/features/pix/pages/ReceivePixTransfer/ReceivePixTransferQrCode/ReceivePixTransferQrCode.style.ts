import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  subheader: {
    marginTop: 8,
    fontWeight: 700,
    color: colors.source.neutral,
    marginBottom: 60,
    '& .MuiTypography-root': {
      fontWeight: 'inherit',
    },
  },
  title: {
    fontSize: '36px',
  },
  value: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 400,
    color: colors.source.neutral,
    textAlign: 'center',
    margin: '5px',
    marginTop: '0xp',
  },
  qrCodeWrapper: {
    padding: '0 94px 60px 94px',
  },
  qrCode: {
    width: '100%',
    flexGrow: 1,
    marginBottom: -70,
  },
  button: {
    margin: '10px',
  },
  makeStyles_view: {
    marginTop: 0,
  },
  muiGrid_item: {
    '& .MuiGrid-item': {
      marginTop: -100,
    },
  },

  footer: {
    marginBottom: -5,
    display: 'flex',
  },

  text: {
    color: colors.neutral.shade40,
    fontSize: 18,
    fontWeight: 500,
  },
  keyTypesList: {
    '& > *': {
      height: 56,
      padding: '6px 16px',
      justifyContent: 'flex-start',
      '& #title': {
        alignItems: 'left',
        display: 'flex',
        lineHeight: '16.4px',
      },
      '& #subtitle': {
        lineHeight: '12px',
      },
      '& #start-icon-column': {
        width: 32,
      },
      '& #start-icon': {
        height: 18,
        width: 'auto',
      },
    },
    '& .displayNone': {
      display: 'none',
    },
  },
})
