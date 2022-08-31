import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  actionListItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: 48,
    fontSize: 12,
    lineHeight: '14.06px',
    color: 'black',

    '& > *': {
      fontSize: 'inherit',
      lineHeight: 'inherit',
      color: 'inherit',
    },
  },
})
