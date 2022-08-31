import { makeStyles } from '@material-ui/core'
import { theme } from '_config/theme'

export const useStyles = makeStyles({
  listItemText: {
    textAlign: 'center',
    '& .MuiListItemText-primary': {
      fontSize: 12,
      fontWeight: 400,
      color: '#000000',
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
  radio: {
    position: 'relative',
    '& .MuiSvgIcon-root': {
      borderRadius: '50%',
      width: 13,
      height: 13,
      border: '1px solid #c0c0c0',
    },
    color: 'transparent',
    '&.Mui-checked': {
      '&:after': {
        content: "''",
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
        width: 9,
        height: 9,
        backgroundColor: theme.palette.primary.main,
        borderRadius: '50%',
      },
    },
  },
})
