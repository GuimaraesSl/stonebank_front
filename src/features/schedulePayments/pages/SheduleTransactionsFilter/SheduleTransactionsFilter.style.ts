import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  grayFilterBand: {
    backgroundColor: colors.system.light.surface,
  },
  titleAndDescription: {
    marginBottom: 16,
  },
  mainContent: {
    padding: 16,
  },
  datesSection: {
    '& .MuiTypography-root': {
      color: colors.system.light.neutral,
      fontSize: 12,
      fontWeight: 500,
    },
  },
  applyButton: {
    display: 'flex',
    justifyContent: 'center',
  },
  clearButton: {
    display: 'flex',
    marginTop: '16px',
    justifyContent: 'flex-end',
  },
  customTagButtonsFilter: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  textAndDate: {
    display: 'flex',
    width: '100%',
    color: colors.system.light.neutral,
  },
  textFilterDate: {
    marginTop: '5px',
    marginRight: '10px',
    marginLeft: '10px',
  },
  textFilterDateDay: {
    marginTop: '5px',
    marginRight: '6px',
  },
  scheduleButton: {
    marginTop: 64,
    '& .MuiFormControl-root': {
      display: 'none',
    },
  },
  schedulingMessage: {
    marginTop: 64,
  },
  errorMessage: {
    padding: '10px',
    marginTop: '16px',
    fontSize: '12px',
    alignItems: 'center',
    color: colors.system.light.error,
  },
  img: {
    display: 'block',
    alignItems: 'center',
    marginRight: 4,
  },
})
