import { alpha, makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  ButtonAttachDocuments: {
    width: '100%',
    height: '55px',
    background: colors.system.light.surface,
    boxShadow: `0px 2px 2px ${alpha(colors.readOnly.light.black, 0.25)}`,
    borderRadius: '4px',
    marginBottom: '9px',
  },
  contentAttachDocuments: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconAttachDocuments: {
    width: '27px',
    height: '32px',
    margin: '0 30px',
  },
  labelAttachDocuments: {
    color: colors.system.light.neutral,
    fontSize: '12px',
    textTransform: 'none',
  },
})
