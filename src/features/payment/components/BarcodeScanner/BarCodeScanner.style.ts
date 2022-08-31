import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  camera: {
    textAlign: 'center',
    display: 'flex',
    height: '100vh ',
    overflow: 'hidden',
    zIndex: 0,
    '& .scandit-logo': {
      display: 'none',
    },
  },
  wrapper: {
    display: 'flex',
    writingMode: 'vertical-lr',
    position: 'absolute',
    height: '100%',
    marginLeft: '68px',
    justifyContent: 'center',
  },
})
