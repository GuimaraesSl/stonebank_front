import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  containerCard: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 187,
    height: 99,
    top: 73,
    left: 54,
    radius: 10,
    borderRadius: 13,
  },
  headerCardText: {
    fontSize: 12,
    fontWeight: 400,
    color: '#000000',
    transform: 'scale(0.993200, 1.106798)',
    width: '147px',
    display: 'block',
  },
  cardContent: {
    paddingTop: 7,
    paddingLeft: 10,
    paddingRight: 10,
  },
  numberCard: {
    fontWeight: 500,
    fontSize: 12,
    color: '#000000',
    width: 122,
    height: 27,
  },
  nameCard: {
    fontSize: 12,
    fontWeight: 400,
    color: '#000000',
    display: 'block',
    width: 100,
    height: 19,
  },
  contentNumberCard: {
    marginTop: 13,
    display: 'flex',
    justifyContent: 'space-between',
  },
  contentFlag: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 2,
  },
  prepagText: {
    fontSize: 10,
    margin: 0,
    color: colors.system.light.neutral,
    fontWeight: 400,
    width: 42,
  },
  flagStyle: {
    width: 39.73,
    height: 14.8,
  },
})
