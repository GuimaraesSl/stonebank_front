import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  backgroundEditAccount: {
    width: '100%',
    height: '169px',
    display: 'flex',
    flexDirection: 'column',
    padding: '15px 15px 0px 15px',
    backgroundColor: colors.system.light.surface,
  },
  contentEdit: {
    width: '100%',
    paddingLeft: '15px',
    paddingRight: '15px',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
  imageUser: {
    justifyContent: 'center',
    marginTop: '-50px',
  },
  alingInputEditNickname: {
    marginTop: '12%',
    marginRight: '17px',
    marginLeft: '17px',
  },
  formFooterEdit: {
    position: 'fixed',
    bottom: '16px',
    left: '16px',
    right: '16px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
})
