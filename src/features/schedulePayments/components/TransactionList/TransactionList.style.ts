import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyle = makeStyles({
  transactionContainer: {
    width: '100%',
    display: 'flex',
    borderRadius: '3px',
    flexDirection: 'row',
    marginBottom: '1.5px',
    boxShadow: `0px 1.5px 1px 0px ${colors.neutral.shade20}`,
  },
  transactionCard: {
    width: '100%',
    display: 'flex',
    marginLeft: '13px',
    alignItems: 'left',
    flexDirection: 'column',
  },
  sheduleTransactionCard: {
    width: '100%',
    display: 'flex',
    marginLeft: '13px',
    alignItems: 'left',
    flexDirection: 'column',
  },
  textDescripition: {
    display: 'flex',
    marginTop: '7px',
    fontSize: '11px',
    fontWeight: 300,
    textAlign: 'left',
    lineHeight: '12px',
    flexDirection: 'row',
    color: colors.system.light.neutral,
  },
  textName: {
    display: 'flex',

    fontSize: '11px',
    fontWeight: 300,
    textAlign: 'left',
    lineHeight: '12px',
    flexDirection: 'row',
    color: colors.system.light.neutral,
  },
  transactionsDate: {
    width: '100%',
    display: 'flex',
    fontSize: '11px',
    textAlign: 'right',
    lineHeight: '11px',
    justifyContent: 'flex-end',
    color: colors.system.light.neutral,
  },
  transactionsDateValue: {
    fontWeight: 'bold',
    fontSize: '10px',
  },
  transactionValue: {
    width: '100%',
    display: 'flex',
    marginTop: '6px',
    fontSize: '15px',
    textAlign: 'left',
    fontWeight: 'bold',
    color: colors.system.light.neutral,
  },
  transactionStatus: {
    marginTop: '7px',
    fontSize: '10px',
    textAlign: 'left',
    lineHeight: '11px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: colors.system.light.neutral,
  },
  icon: {
    fontSize: '9px',
    textAlign: 'left',
    lineHeight: '11px',
    fontWeight: 'bold',
    alignItems: 'center',
    flexDirection: 'row',
    color: colors.system.light.neutral,
    '& img': {
      marginTop: '1px',
      display: 'block',
      alignItems: 'center',
    },
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    fontSize: '11px',
    textAlign: 'right',
    lineHeight: '11px',
    justifyContent: 'flex-end',
    color: colors.system.light.neutral,
  },
  cancelButton: {
    fontSize: '9px',
    position: 'relative',
    borderRadius: '11px',
    border: `1px solid ${colors.neutral.shade70}`,
    '& .MuiButton-label': {
      textTransform: 'none',
      color: colors.neutral.shade40,
    },
    '& .MuiButton-startIcon': {
      marginRight: '0px',
    },
    '&:hover': {
      backgroundColor: colors.readOnly.light.surface5,

      '& .MuiButton-label': {
        color: colors.system.light.onPrimary,
      },
    },
    '& .MuiSvgIcon-colorPrimary': {
      color: colors.system.light.error,
    },
  },
})
