import { makeStyles } from '@material-ui/core'
import { colors, theme } from '_config/theme'

interface TopUpScheduleStyleProps {
  visibilityRepeatDays: string
}

export const useStyle = makeStyles<typeof theme, TopUpScheduleStyleProps>({
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
  headerStyle: {
    width: 140,
    paddingBottom: '13px',
    '& div p': {
      lineHeight: '18.2px',
    },
  },
  creditRequestContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '18px',
    '& img': {
      paddingLeft: 51,
    },
    '& .wrapper': {
      paddingRight: '19.2%',
      '& p': {
        margin: 0,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '16px',
        color: colors.system.light.neutral,
        marginBottom: '-4px',
      },
      '& span': {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 300,
        fontSize: '10px',
        lineHeight: '12px',
        color: colors.system.light.neutral,
        paddingLeft: '1px',
      },
    },
  },
  dateInputContainer: {
    margin: '10px 2px 0 2px',
    '& label': {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '12px',
      lineHeight: '130%',
      color: colors.system.light.neutral,
      position: 'relative',
      left: '5px',
      top: '3px',
    },
  },
  dateInput: {
    border: '0.8px solid #C4C4C4',
    borderRadius: '5px',
    height: '40px',
    width: '100%',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '130%',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: '-0.01em',
    color: colors.system.light.neutral,
    '&:disabled': {
      backgroundColor: '#fff',
    },
  },
  scheduleButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '22px',
  },
  switchContainer: {
    display: 'flex',
    marginTop: '37px',
    '& .buttonSwitch': {
      marginLeft: '13px',
    },
    '& .switchContainerLabel': {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '12px',
      lineHeight: '14px',
      color: '#000000',
      transform: 'scale(0.97985, 0.875)',
      marginRight: '13px',
    },
  },
  contentBalanceContainerReference: {
    position: 'relative',
    '& .contentBalanceContainer': {
      position: 'absolute',
      top: -27,
    },
  },
  repeatDaysContainerReference: {
    position: 'relative',
    display: props => props.visibilityRepeatDays,
    '& .repeatDaysMensage': {
      position: 'absolute',
      marginTop: '13px',
      marginLeft: '1px',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '16.41px',
      color: colors.system.light.neutral,
    },
  },
})
