import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyle = makeStyles({
  accountCard: {
    cursor: 'pointer',
    color: colors.system.light.neutral,
    padding: '8px 0px',
    backgroundColor: 'transparent',

    '& .MuiGrid-item': {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  accountName: {
    fontSize: 13,
    lineHeight: '15.23px',
  },
  accountImage: {
    height: 64,
    width: 64,
  },
  accountData: {
    flexGrow: 1,
    width: '25%',
    '& .MuiGrid-item:first-of-type': {
      display: 'block',
    },
  },
  endIcon: {
    '& > *': {
      height: 24,
      width: 24,
    },
  },
  starIcon: {
    width: '15%',
    '& > *': {
      height: 24,
      width: 24,
    },
  },
  description: {
    fontSize: '10px',
    lineHeight: '11.72px',
  },
})
