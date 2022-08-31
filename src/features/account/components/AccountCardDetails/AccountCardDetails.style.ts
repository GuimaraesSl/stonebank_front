import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

interface StyleProps {
  expandClass: boolean
}

export const useStyles = makeStyles<StyleProps>({
  container: {
    paddingTop: '16px',
  },

  containerPopUp: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.system.light.primary,
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    zIndex: 1,
  },

  buttonClose: {
    transform: 'translate(0%,50%)',
    float: 'right',
    marginTop: '-26px',
    marginRight: '24px',
  },
  buttonShare: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
  },
  infos: {
    color: colors.system.light.onPrimary,
    alignItems: 'center',
    lineHeight: '22px',
    textAlign: 'center',
  },
  description: {
    paddingTop: '24px',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: '12px',
    lineHeight: '130%',
    fontweight: '300',
  },
  nameAccount: {
    fontfamily: 'Roboto',
    fontstyle: 'normal',
    fontweight: '500',
    fontsize: '16px',
    lineheight: '130%',
  },
  bankingDataGrid: {
    display: 'flex',
    flexflow: 'row wrap',
    justifyContent: 'center',
  },
  data: {
    fontfamily: 'Roboto',
    fontstyle: 'normal',
    fontweight: 'normal',
    fontsize: '15px',
    textAlign: 'left',
    marginLeft: '2px',
  },
  drawer: {
    '& .MuiDrawer-paper': {
      background: 'transparent',
      boxShadow: 'none',
    },
  },
})
