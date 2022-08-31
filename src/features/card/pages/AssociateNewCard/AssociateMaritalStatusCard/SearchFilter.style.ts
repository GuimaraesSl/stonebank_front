import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'
import IconArrowDown from '_assets/icons/arrow-select-box.svg'
export const useStyles = makeStyles({
  selectGender: {
    '& .MuiSelect-select': {
      fontSize: '18px',
      paddingTop: '10px',
      paddingLeft: '12px',
      borderRadius: '5px',
      paddingRight: '14px',
      colors: colors.neutral.shade50,
      border: `0.8px solid ${colors.neutral.shade30}`,
      backgroundColor: colors.system.light.onPrimary,
      '& .MuiInputBase-input': {
        marginLeft: '10px',
        textAlign: 'left',
        padding: '6px 0px 7px 0px',
        '&.MuiInputBase-inputAdornedStart': {
          marginLeft: '-28px',
        },
        '&.MuiInputBase-inputAdornedEnd': {
          marginRight: '-28px',
        },
      },
    },
    '&::before, &::after': {
      content: 'none',
    },
    '& .MuiSelect-icon': {
      marginTop: '9px',
      marginRight: '4px',
      backgroundRepeat: 'no-repeat',
      background: `url(${IconArrowDown})`,
      '& *': {
        display: 'none',
      },
    },
    '& .MuiSelect-iconOpen': {
      marginTop: '-9px',
      marginRight: '12px',
      '& *': {
        display: 'none',
      },
    },
  },
  nextButtonLabel: {
    fontFamily: 'Roboto',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '14px',
    letterSpacing: '0em',
    textAlign: 'right',
    color: '#FFFFFF',
  },
  informativetext: {
    marginBottom: '5px',
    fontFamily: 'Roboto',
    fontSize: '12px',
    fontStyle: 'normal',
  },
})
