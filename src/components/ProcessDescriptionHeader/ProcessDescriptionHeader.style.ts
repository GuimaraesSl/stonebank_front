import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  
  title: {
    color:colors.readOnly.light.blackLight,
    fontSize: '2.18rem',
    fontWeight: 700,
    fontFamily: "'Merriweather Sans', sans-serif",
    padding: '40px 0 15px 0'
  },

  subtitle: {
    marginBottom: 4,
    fontWeight: 500,
    fontSize: '15px',
    lineHeight: '16px',
  },
  description: {
    fontSize: '1.125rem',
    fontFamily: "'Baloo Bhaina 2', cursive",
    fontWeight: 400,
    margin: '0 0 20px 0',
    color: colors.readOnly.light.blackLight+"95",
  },
})
