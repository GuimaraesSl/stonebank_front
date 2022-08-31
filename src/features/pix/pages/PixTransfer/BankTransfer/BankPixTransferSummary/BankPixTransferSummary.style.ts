import { makeStyles } from '@material-ui/core'
import { colors } from '_config'

export const useStyles = makeStyles({
  alertMessage: {
    fontWeight: 300,
    fontSize: '15px',
    marginTop: '20px',
    lineHeight: '130%',
    marginBottom: '10px',
    color: colors.source.neutral,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
})
