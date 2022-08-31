import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  listItemText: {
    textAlign: 'center',
    '& .MuiListItemText-primary': {
      fontSize: 12,
      fontWeight: 400,
      color: '#333333',
    },
    '& .MuiList-root': {
      paddingBottom: 0,
    },
  },
  listItem: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 16,
  },
  listItemSecondaryAction: {
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: '-8px',
  },
})
