import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  associateCard: {
    left: 6.87,
    right: 0,
    top: 0,
    borderRadius: 4,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: '20px',
  },
  listAssociate: {
    marginBottom: '70px',
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',

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
