import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyle = makeStyles({
  detailInfoTags: {
    width: '100%',
    paddingLeft: '15px',
    paddingRight: '15px',
    marginTop: '20px',
    marginBottom: '20px',
    flexDirection: 'column',
    justifyContent: 'center',
    color: colors.system.light.neutral,
  },
})
