import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  subheader: {
    marginTop: 8,
    fontWeight: 700,
    alignContent: 'center',
    color: colors.source.neutral,
    '& .MuiTypography-root': {
      fontWeight: 'inherit',
    },
  },
  title: {
    fontSize: 12,
    alignItems: 'center',
    alignContent: 'center',
  },
  value: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: 400,
    color: colors.source.neutral,
  },
  qrCodeWrapper: {
    padding: '0 64px',
  },
  qrCode: {
    width: '100%',
    flexGrow: 1,
    marginBottom: 24,
  },
  scheduleButton: {
    marginTop: 20,
    '& .MuiFormControl-root': {
      display: 'none',
    },
  },
  input: {
    width: '100%',
    border: 'none',
    fontWeight: 700,
    fontSize: 24,
    textAlign: 'center',
    color: colors.source.neutral,
    backgroundColor: colors.source.primary,

    '&:focus': {
      outline: 'none',
      backgroundColor: colors.source.primary,
    },
  },
  receiverSection: {
    '& #receiver-info-card': {
      margin: '0 -16px',
      marginTop: 8,
      marginBottom: -8,
    },
  },
  text: {
    marginTop: 15,
    fontSize: '0.75rem',
    fontWeight: 500,
  },
  message: {
    marginLeft: '5px',
    color: colors.system.light.error,
    fontSize: '12px',
  },

  doubt: {
    marginLeft: '5px',
    fontSize: '14px',
    marginTop: '12px',
  },

  optionalIdentifier: {
    marginTop: '10px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
})
