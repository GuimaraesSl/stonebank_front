import { alpha, makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export interface SelectionCardPropsStyles {
  variant?: 'pix'
}
export const useStyles = makeStyles<SelectionCardPropsStyles>({
  card: {
    display: ({ variant }: SelectionCardPropsStyles) =>
      variant === 'pix' ? 'grid' : 'flex',
    borderRadius: ({ variant }: SelectionCardPropsStyles) =>
      variant === 'pix' ? 4 : 0,
    justifyContent: ({ variant }: SelectionCardPropsStyles) =>
      variant ?? 'space-between',
    padding: 16,
    cursor: 'pointer',
    boxShadow: ({ variant }: SelectionCardPropsStyles) =>
      variant === 'pix'
        ? `0px 2px 2px 0px ${alpha(
            colors.readOnly.light.black,
            0.12,
          )}, 0px 0px 2px 0px ${alpha(colors.readOnly.light.black, 0.24)}`
        : `0px 2px 2px 0px ${alpha(
            colors.readOnly.light.black,
            0.24,
          )}, 0px 0px 2px 0px ${alpha(colors.readOnly.light.black, 0.12)}`,
    gridTemplateColumns: ({ variant }: SelectionCardPropsStyles) => {
      if (variant === 'pix') return 'auto 1fr auto'
    },
    columnGap: ({ variant }: SelectionCardPropsStyles) => {
      if (variant === 'pix') return 12
    },
  },

  endIcon: {
    height: 36,
    width: 36,
  },
  text: {
    color: colors.system.light.neutral,
    paddingRight: 8,
    marginTop: ({ variant }: SelectionCardPropsStyles) => {
      if (variant === 'pix') return '7px 0px 0px 0px'
    },
  },
  title: {
    fontSize: 13,
    fontWeight: 500,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 400,
    marginTop: 4,

    '& > *': {
      fontSize: 12,
      fontWeight: 400,
    },
  },
  icon: {
    height: 30,
    width: 30,

    '& *': {
      height: '100%',
    },
  },
  endLabel: {
    fontSize: 10,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
