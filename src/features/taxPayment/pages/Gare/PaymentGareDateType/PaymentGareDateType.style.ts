import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  scheduleButton: {
    marginTop: 64,
    '& .MuiFormControl-root': {
      display: 'none',
    },
  },
  wrapper: {
    border: 'none',
    width: '100%',
    '& .MuiInputBase-input': { textAlign: 'center' },
    '& .MuiIconButton-root': {
      padding: '0px',
    },
  },
})
