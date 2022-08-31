import { makeStyles } from '@material-ui/core'
import { colors, theme } from '_config/theme'

interface ValueAdditionProps {
  valueWithdrawal?: number
}

export const useStyles = makeStyles<ValueAdditionProps>({
  topSide: {
    backgroundColor: '#F9F9F9',
    padding: '0 16px',
  },
  bottomSide: {
    padding: '0 16px',
  },
  centerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentBalance: {
    width: 157,
    height: 21,
    backgroundColor: '#FFF',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
    borderRadius: 9,
    marginBottom: 16,
    '& p': {
      width: 136,
      height: 18,
      display: 'flex',
      whiteSpace: 'pre',
      padding: '1px 14px 2px 7px',
      fontSize: 14,
      lineHeight: '18.2px',
    },
    '& strong': {
      fontWeight: 500,
    },
  },
  valueLabel: {
    fontSize: 12,
    lineHeight: '15.6px',
    fontWeight: 700,
    color: theme.palette.primary.main,
    marginBottom: 5,
  },
  valueInput: {
    fontSize: 24,
    fontWeight: 700,
    color: ({ valueWithdrawal }: ValueAdditionProps) => {
      if (valueWithdrawal === 0) return colors.neutral.shade30
      return colors.system.light.primary
    },
  },
  limitWrapper: {
    fontSize: 10,
    lineHeight: '13px',
    textAlign: 'center',
    width: 153,
    margin: '10px 0 30px',
    color: colors.neutral.shade40,
  },
  addValueTitle: {
    width: 183,
    height: 16,
    letterSpacing: '0em',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '16.41px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    margin: '13px 25px',
    flexWrap: 'wrap',
    gap: '9px 14px',
    '& .MuiButton-contained': {
      width: 81,
      height: 32,
      padding: 0,
      color: theme.palette.primary.main,
      borderRadius: 10,
      border: '1px solid #DCDCDC',
      boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.15)',
      fontSize: 8,
      lineHeight: '9.38px',
      fontWeight: 500,
      letterSpacing: '-0.05em',
      '& .MuiButton-label': {
        display: 'flex',
        alignItems: 'flex-end',
        whiteSpace: 'pre',
        width: 67,
        height: 14,
      },
      '& span > span': {
        fontSize: 12,
        lineHeight: '14.06px',
      },
      '&:hover': {
        color: colors.system.light.onPrimary,
      },
    },
  },
  cleanValueButtonDisabled: {
    color: '#C4C4C4',
    '& .MuiButton-label': {
      width: 54,
      height: 11,
    },
  },
  descriptionWrapper: {
    marginTop: 19,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 139,
    height: 43,
  },
  description: {
    fontSize: 8,
    textAlign: 'center',
    fontWeight: 400,
    color: colors.neutral.shade40,
    letterSpacing: '0em',
  },
})
