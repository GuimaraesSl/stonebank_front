import { makeStyles } from '@material-ui/core'
import { colors, theme } from '_config/theme'

interface StyleProps {
  isVisible?: string
}

export const useStyle = makeStyles<typeof theme, StyleProps>({
  container: {
    display: props => props.isVisible,
  },
  descriptionLabel: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '15.6px',
    color: colors.system.light.neutral,
    paddingLeft: '5px',
  },
  inputContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiInputBase-input': {
      width: '256px',
      height: '3px',
      color: colors.system.light.neutral,
      display: 'flex',
      textAlign: 'center',
    },
  },
  textFieldContent: {
    width: '98.615%',
  },
})
