import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  title: {
    fontSize: '20px',
    fontWeight: 700,
    textAlign: 'center',
    marginTop: 50,
  },
  description: {
    fontSize: '12px',
    fontWeight: 400,
    color: colors.neutral.shade40,
    textAlign: 'center',
  },
  descriptionWrapper: {
    margin: '9px 56px 0px 56px',
  },
  descriptionFooter: {
    fontSize: 12,
    fontWeight: 400,
    color: colors.neutral.shade40,
    marginTop: 42,
  },
  content: {
    marginTop: '10%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameDigitalWithdrawal: {
    width: 150,
  },
  imgBank: {
    marginTop: 9,
    width: 135,
    height: 23,
  },
  bankMachine: {
    width: 135,
    marginTop: 9,
  },
})
