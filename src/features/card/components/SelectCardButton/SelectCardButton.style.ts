import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export interface SelectButtonCardProps {
  blocked?: boolean
  flagtype?: string
}

export const useStyles = makeStyles<SelectButtonCardProps>({
  spanText: {
    fontWeight: 300,
    fontSize: 12,
    color: colors.system.light.neutral,
    width: '193px',
    display: 'inline-block',
    height: 13,
  },
  infoCard: {
    color: colors.system.light.neutral,
    fontSize: 13,
    fontWeight: 500,
    width: 256,
    height: 19,
  },
  prepagText: {
    fontSize: 10,
    fontWeight: 400,
    color: colors.system.light.neutral,
    marginTop: 2,
  },
  fullName: {
    fontSize: 12,
    color: colors.system.light.neutral,
    fontWeight: 400,
    width: 195,
    height: 13,
  },
  flagCard: {
    width: ({ flagtype }: SelectButtonCardProps) => {
      if (flagtype === 'ELO') return 50.03
      if (flagtype === 'MasterCard') return 41
      if (flagtype === 'Visa') return 44
    },

    height: ({ flagtype }: SelectButtonCardProps) => {
      if (flagtype === 'ELO') return 18.64
      if (flagtype === 'MasterCard') return 32
      if (flagtype === 'Visa') return 25
    },
  },
  list: {
    margin: '-16px',
    marginTop: '-20px',
  },
  listItem: {
    paddingTop: '23px',
    paddingBottom: '12px',
    paddingLeft: 25,
    '& .MuiBox-root-84': {
      paddingBottom: '70px',
    },
  },
  containerFlag: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
  },
  contentFlag: {
    marginRight: '-6px',
  },
  imgBlock: {
    width: 10.42,
    height: 15,
  },
  blockStyle: {
    marginRight: 3,
    display: ({ blocked }: SelectButtonCardProps) => {
      return blocked ? 'initial' : 'none'
    },
  },
  containerSpan: {
    marginTop: '-16px',
  },
})
