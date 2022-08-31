import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  descriptionBoxText: {
    width: 260,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 20,
    alignItems: 'center',
  },
  listButtons: {
    marginTop: '20px',
  },
  description: {
    color: colors.system.light.neutral,
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '130%',
  },
  idCard: {
    fontWeight: 300,
    textAlign: 'center',
    fontSize: '10px',
    lineHeight: '13px',
    marginTop: '10px',
  },
})
