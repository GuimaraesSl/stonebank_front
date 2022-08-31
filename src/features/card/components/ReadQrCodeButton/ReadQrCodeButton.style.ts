import { makeStyles } from '@material-ui/core'
import { theme } from '_config/theme'

export const useStyles = makeStyles({
  qrCodeButtonStyle: {
    display: 'flex',
    justifyContent: 'center',
    '& button': {
      width: '52.78%',
      borderRadius: '4px',
      marginTop: '34px',
      boxShadow: 'none',
    },
    '& .MuiButton-contained': {
      border: '0.5px solid #E8E8E8',
    },
    '& .labelButtonQrCode': {
      marginLeft: '6px',
      fontSize: '9px',
      fontFamily: 'Roboto',
      fontWeight: 500,
      lineHeight: '10.55px',
      transform: 'scale(0.947, 1.1)',
    },
  },
  qrcodeimg: {
    width: 23.9,
    height: 24.32,
  },
})
