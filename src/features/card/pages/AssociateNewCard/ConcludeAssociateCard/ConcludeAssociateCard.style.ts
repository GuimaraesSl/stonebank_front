import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

interface StylesProps {
  footerPosition?: 'fixed'
}

export const useStyles = makeStyles({
  boxHeader: {
    marginTop: '30%',
    height: '40%',
  },
  boxMain: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImg: {
    marginTop: '40%',
    display: 'flex',
    justifyContent: 'center',
    height: '40%',
  },
  title: {
    height: '10%',
    fontWeight: 'bold',
    fontSize: '30px',
    textAlign: 'center',
    color: colors.primary.shade0,
  },
  boxDescription: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 18,
    width: '100%',
    height: '20%',
  },
  description: {
    marginTop: '11%',
    width: '80%',
    textAlign: 'center',
  },
  buttonsWrapper: {},
  footer: {
    marginBottom: '2%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'end',
    height: '30%',
    '& .MuiButton-root': {
      minWidth: 136,
      borderRadius: 10,
    },
    '& .MuiButton-label': {
      display: 'block',
      position: 'relative',
    },
    '& .MuiButton-startIcon, & .MuiButton-endIcon': {
      display: 'block',
      position: 'absolute',
    },
    '& .MuiButton-startIcon': {
      top: 0,
      left: 0,
      marginRight: 8,
    },
    '& .MuiButton-endIcon': {
      marginLeft: 8,
      top: 0,
      right: 0,
    },
  },
})
