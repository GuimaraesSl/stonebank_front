import { makeStyles } from '@material-ui/core'
import { colors } from '_config'

export const useStyles = makeStyles({
  page: {
    '& main': {
      display: 'flex',
    },
  },
  copyPasteCodeSection: {
    color: colors.neutral.shade40,
    display: 'grid',
    gridTemplateRows: 'repeat(3, auto)',
    rowGap: 8,
    '& > *': {
      color: 'inherit',
    },
    '& > .MuiTypography-root:first-of-type': {
      fontSize: 14,
      fontWeight: 'bold',
    },
    '& > .MuiTypography-root:last-of-type': {
      fontSize: 12,
    },
  },
  cards: {
    display: 'grid',
    gridAutoRows: 'auto',
    margin: '0 -16px',
    rowGap: 2,
  },
  scheduleButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    marginBottom: '20px',
  },
})
