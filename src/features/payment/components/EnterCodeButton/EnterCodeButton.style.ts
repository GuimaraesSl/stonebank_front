import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  EnterCodeButton: {
    display: 'flex',
    padding: '0.5%',
    alignItems: 'center',
    justifyContent: 'center',
    background: colors.system.light.surface,
    width: '30px',
    height: '158px',
    border: `0.5px solid  ${colors.system.light.background}`,
    borderRadius: '4px',
    textAlign: 'center',
  },
  textHelper: {
    color: colors.system.light.primary,
    marginTop: '9px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '11px',
    textAlign: 'left',
    textDecoration: 'none',
  },
})
