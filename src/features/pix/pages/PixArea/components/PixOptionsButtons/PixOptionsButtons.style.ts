import { alpha, makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  card: {
    display: 'grid',
    borderRadius: '0px',
    justifyContent: 'space-between',
    padding: '0px 0px 8px 21px',
    cursor: 'pointer',
    boxShadow: `0px 1px 0px 0px ${alpha(
      colors.readOnly.light.black,
      0.12,
    )}, 0px 2px 0px 0px ${alpha(colors.readOnly.light.black, 0.24)}`,
    gridTemplateColumns: 'auto 1fr auto',
    columnGap: '12px',
  },
  endIcon: {
    height: '36px',
    width: '36px',
  },
  text: {
    color: colors.source.neutral,
    paddingRight: '8px',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '16px',
    fontWeight: 600,
  },
  subtitle: {
    fontSize: '11px',
    fontWeight: 400,
    minWidth: '222px',
    '& > *': {
      fontSize: '12px',
      fontWeight: 400,
      width: '213px',
    },
  },
  icon: {
    height: '32px',
    width: '32px',

    '& *': {
      height: '100%',
    },
  },
  endLabel: {
    fontSize: '10px',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
