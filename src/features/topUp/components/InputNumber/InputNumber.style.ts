import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyle = makeStyles({
  descriptionLabel: {
    fontSize: '12px',
    fontWeight: 300,
    lineHeight: '15.6px',
    color: colors.system.light.neutral,
    paddingLeft: '5px',
  },
  inputContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiInputBase-input': {
      width: '100%',
      height: '3px',
      color: colors.system.light.neutral,
      display: 'flex',
      textAlign: 'center',
      fontSize: '18px',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '5px',
    },
  },
  textFieldContent: {
    width: '98.615%',
  },
})
