import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyle = makeStyles({
  allAccountCard: {
    backgroundColor: colors.system.light.primary,
    border: 'none',
    display: 'grid',
    gridTemplateColumns: '0.25fr 1fr 0.25fr',
    alignItems: 'center',
    cursor: 'pointer',
  },
  infoAllAccounts: {
    lineHeight: '14px',
    color: colors.readOnly.light.white,
    paddingLeft: '18px',
  },
  nameAccount: {
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: '15px',
  },
  accountInformations: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '14,06px',
  },
  imageAccunt: {
    maxWidth: '25px',
    maxHeight: '25px',
    alignItems: 'right',
    marginLeft: '25px',
  },
})
