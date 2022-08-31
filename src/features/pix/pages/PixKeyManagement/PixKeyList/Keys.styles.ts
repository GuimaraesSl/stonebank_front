import { makeStyles } from '@material-ui/core'
import { colors } from '_config'

export const useStyles = makeStyles({
  page: {
    '& main': {
      display: 'grid',
      gridTemplateRows: 'repeat(4, max-content)',
      rowGap: 12,
    },
  },
  text: {
    color: colors.neutral.shade40,
    fontSize: 12,
    fontWeight: 500,
  },
  keyTypesList: {
    '& > *': {
      height: '56px',
      padding: '6px 16px',
      '& #title': {
        lineHeight: '10.4px',
        marginTop: '10px',
      },
      '& #subtitle': {
        lineHeight: '8px',
      },
      '& #start-icon-column': {
        width: '24px',
        marginTop: '-5px',
      },
      '& #start-icon': {
        height: '14px',
        width: 'auto',
      },
    },
    '& .displayNone': {
      display: 'none',
    },
  },
})
