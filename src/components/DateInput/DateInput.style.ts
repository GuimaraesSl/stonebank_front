import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export interface DateInputProps {
  showDate?: boolean
}
export const useStyles = makeStyles({
  wrapper: {
    border: 'none',
    padding: 0,
    width: '100%',
    '& .MuiInputBase-input': {
      textAlign: 'center',
    },
    '& .MuiFormLabel-root': {
      color: colors.system.light.primary,
      fontWeight: 500,
    },
    '& .MuiIconButton-root': {
      padding: '0px',
    },
    '& .MuiInputAdornment-positionEnd': {
      marginLeft: '0px',
    },
  },
})
