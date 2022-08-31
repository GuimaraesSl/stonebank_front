import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyle = makeStyles({
  detailsButton: {
    width: '80px',
    height: '19px',
    border: `0.5px solid ${colors.system.light.background}`,
    borderRadius: 4,
    backgroundColor: colors.readOnly.light.white,
    color: colors.system.light.onBackground,
    padding: '4px 6px',
    fontSize: 9,
    fontWeight: 650,
    radius: '4px',
    borderWidth: 0.1,
    marginLeft: '75px',
    textTransform: 'none',
  },
})
