import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyle = makeStyles({
  detailReplacement_content: {
    width: '100%',
    color: colors.system.light.neutral,
    fontSize: 12,
    fontWeight: 300,
  },
  transfer_detail: {
    fontSize: 14,
    lineHeight: '18.5px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    marginRight: '25px',
  },
  cancel_detail: {
    marginBottom: '18px',
  },
  address_detail: {
    width: '180px',
  },
  contentdetail: {
    marginBottom: 13,
  },
})
