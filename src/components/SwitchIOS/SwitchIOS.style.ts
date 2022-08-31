import { withStyles, Theme, createStyles } from '@material-ui/core/styles'

export const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 33,
      height: 16,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: '#FFFFFF',
      '&$checked': {
        transform: 'translateX(17px)',
        color: '#FFFFFF',
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 11,
      height: 11,
      boxShadow: 'none',
    },
    checked: {},
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: '#C4C4C4',
    },
  }),
)
