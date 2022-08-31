import { makeStyles, alpha } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  container: {
    height: '100%',
    background: colors.system.light.primary,
    justifyContent: 'center',
    width: '46px',
    textAlign: 'center',
  },

  optionBar: {
    flex: 1,
    alignItems: 'center',
  },

  textBarCode: {
    display: 'flex',
    marginTop: '7%',
    alignItems: 'center',
  },

  informationAlign: {
    width: '46px',
    display: 'flex',
    padding: '8px 0',
    background: `${alpha(colors.system.light.primary, 0.5)}`,
    fontSize: 16,
    fontWeight: 500,
    height: '100%',
  },
  textHelp: {
    fontWeight: 500,
    color: colors.readOnly.light.white,
    fontSize: 12,
    display: 'flex',
    margin: 'auto',
  },

  cameraIcon: {
    marginBottom: '2%',
  },

  informationReader: {
    width: '46px',
    display: 'flex',
    alignContent: 'center',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    padding: '8px 0',
    background: colors.system.light.primary,
    fontWeight: 500,
  },

  textReader: {
    display: 'flex',
    fontWeight: 500,
    color: colors.readOnly.light.white,
    marginTop: '5%',
    fontSize: 12,
  },

  buttonClose: {
    fontSize: 11,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: '4px',
    padding: '5px 3px',
    background: colors.system.light.surface,
    marginBottom: '3%',
    position: 'absolute',
    bottom: 0,
    height: '92px',
  },
})
