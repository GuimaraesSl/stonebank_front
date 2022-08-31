import { makeStyles } from '@material-ui/core'
import { colors } from '_config'

export const useStyles = makeStyles({
  separator: {
    listStyle: 'none',
    padding: 0,
    fontSize: '0.75rem',
    width: '100%',
    borderBottom: `1.5px solid ${colors.system.light.outline}`,
    borderTop: `1.5px solid ${colors.system.light.outline}`,
    marginTop: '15px',
  },
  txtalert: {
    fontSize: 15,
    marginTop: 20,
    marginBottom: 10,
    color: colors.source.neutral,
    fontWeight: 300,
    lineHeight: '130%',
  },
  footer: { display: 'flex', justifyContent: 'space-between' },
})
