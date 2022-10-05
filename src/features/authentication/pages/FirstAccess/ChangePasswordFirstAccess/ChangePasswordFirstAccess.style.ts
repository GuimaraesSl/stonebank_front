import { makeStyles } from '@material-ui/core'
import { theme, colors } from '_config/theme'

export const useStyles = makeStyles({
  
  container: {
    minHeight: '100vh',    
    backgroundColor: colors.system.light.secondaryContainer,
  },

  input: {
    marginTop: theme.spacing(),
  },
  
  description: {
    color: colors.readOnly.light.blackLight,
    paddingTop: 30,
    fontWeight: 300,
    fontSize: 12,
    lineHeight: '15.6px',
  },
})
