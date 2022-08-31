import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  optionsSubheader: {
    marginTop: 20,
  },
  balance: {
    fontSize: '13px',
    alignItems: 'center',
    fontWeight: 500,
  },

  balanceSubheader: {
    marginTop: 8,

    '& #account-balance': {
      fontWeight: 500,
    },
  },

  fieldValue: {
    textAlign: 'right',
  },

  img: {
    height: 30,
    width: 30,
  },
  btnDisplay: {
    marginTop: 20,
    textAlign: 'center',
  },
  otherTaxPaymentButton: {
    width: 120,
  },
})
