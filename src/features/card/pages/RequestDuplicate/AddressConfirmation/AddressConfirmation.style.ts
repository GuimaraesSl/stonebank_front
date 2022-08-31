import { makeStyles } from '@material-ui/core'
import { theme, colors } from '_config/theme'

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  addressDescription: {
    marginTop: 39,
    marginBottom: 60,
    textAlign: 'center',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 1.3,
    letterSpacing: -0.01,
    color: colors.system.light.neutral,

    height: 37,
    width: 219,
  },
  questionIsCorrect: {
    fontSize: 12,
    color: colors.system.light.neutral,

    marginBottom: 28,
    letterSpacing: -0.01,
    width: 123,
    height: 16,
  },
  radioGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 60,
  },
  formLabel: {
    margin: 0,
    '& .MuiFormControlLabel-label': {
      fontSize: 12,
      marginRight: 11.75,
      maxWidth: 22,
      height: 14,
      color: '#000000',
    },
  },
  radio: {
    position: 'relative',
    '& .MuiSvgIcon-root': {
      borderRadius: '50%',
      width: 13,
      height: 13,
      border: '1px solid #c0c0c0',
    },
    color: 'transparent',
    '&.Mui-checked': {
      '&:after': {
        content: "''",
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
        width: 9,
        height: 9,
        backgroundColor: theme.palette.primary.main,
        borderRadius: '50%',
      },
    },
  },
})
