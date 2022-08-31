import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export interface AccountBalanceStyleProps {
  size?: 'normal' | 'small'
}

export const useStyles = makeStyles({
  hiddenContent: {
    height: 32,
    width: 128,
    borderRadius: 4,
    background: `linear-gradient(${colors.system.light.secondary}, ${colors.system.light.secondary})`,
  },
  currencySymbol: ({ size }: AccountBalanceStyleProps) => ({
    fontSize: 14,
    fontWeight: size === 'normal' ? 700 : 500,
    lineHeight: '16px',
  }),
  accountBalance: ({ size }: AccountBalanceStyleProps) => ({
    fontSize: size === 'normal' ? 24 : 14,
    fontWeight: size === 'normal' ? 700 : 500,
  }),
})
