import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  account: {
    padding: 0,
    color: colors.readOnly.light.white,
  },
  name: {
    wordBreak: 'break-word',
    '& .MuiTypography-root': {
      fontSize: 18,
      fontWeight: 700,
    },
  },
  image: {
    display: 'flex',
    alignItems: 'center',
  },
  img: {
    height: 80,
    width: 80,
  },
})
