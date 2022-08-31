import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export interface BankCardStyleProps {
  selected?: boolean
}

export const useStyles = makeStyles({
  bankCard: {
    borderRadius: 0,
    background: ({ selected }: BankCardStyleProps) =>
      selected ? colors.system.light.primary : colors.readOnly.light.white,

    '& .MuiTypography-root': {
      color: ({ selected }: BankCardStyleProps) =>
        selected ? colors.readOnly.light.white : colors.system.light.neutral,
    },

    '& .MuiListItemText-primary': {
      fontSize: 12,
      fontWeight: 500,
    },
    '& .MuiListItemText-secondary': {
      fontSize: 10,
      fontWeight: 300,
    },
  },
})
