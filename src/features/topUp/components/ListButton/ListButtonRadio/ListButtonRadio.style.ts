import { makeStyles } from "@material-ui/core";
import { colors, theme } from "_config/theme";

export const useStyles = makeStyles({
  listItemText: {
    marginLeft: '-10px',
    '& .MuiListItemText-primary': {
      fontSize: 14,
      fontWeight: 500,
      color: colors.neutral.shade40,
    },
    '& .MuiListItemText-secondary': {
      fontSize: 10,
      lineHeight: '12px',
      fontWeight: 300,
    },
    '& .MuiList-root': {
      paddingBottom: 0,
    },
  },
  listItem: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 16,
    marginLeft: -7,
    height: 54,
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
