import { makeStyles } from '@material-ui/core'

export const useStyle = makeStyles({
  containerPopUp: {
    width: '100%',
    height: 212,
    backgroundColor: '#E8E8E8',
    position: 'absolute',
    padding: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    boxShadow: '0px -2px 8px rgba(0, 0, 0, 0.2)',
  },
  boxbtnclose: {
    position: 'absolute',
    right: 15,
    marginTop: '-15px',
  },
  containerText: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 39,
  },
  textBlock: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '16.41px',
    color: '#333750',
    width: 190,
    transform: 'scale(0.973683,0.974619)',
  },
  subtextBlock: {
    marginTop: 14,
    fontSize: 12,
    lineHeight: '14.06px',
    color: '#333333',
    width: 268,
    fontWeight: 300,
    transform: 'scale(0.979524, 1.030807)',
  },
  contentbutton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  drawer: {
    '& .MuiDrawer-paper': {
      background: 'transparent',
    },
  },
  content: {
    padding: 16,
    backgroundColor: '#E8E8E8',
    color: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'relative',
    marginTop: 12,
    minHeight: 212,
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: -12,
  },
  inputRow: {
    '& div[class="input"]:not(:last-of-type)': {
      marginRight: 12,
    },
    '& div[class="input"]': {
      flex: 1,
      display: 'flex',
      '& input': {
        flex: 1,
        height: 72,
        fontSize: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        color: 'white',
        outline: 'none',
        border: 'none',
        borderRadius: 4,
      },
    },
  },
  buttonsRow: {
    marginBottom: 24,
  },
  subtitle: {
    opacity: 0.9,
  },
})
