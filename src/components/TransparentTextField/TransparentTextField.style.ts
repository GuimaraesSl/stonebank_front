import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export interface TransparentTextFieldStylesProps {
  value: string
}

export const useStyles = makeStyles({
  TransparentTextField: {
    '& .MuiInputBase-input': {
      transform: 'none',
      color: ({ value }: TransparentTextFieldStylesProps) => {
        return value === 'R$ 0,00'
          ? colors.neutral.shade30
          : colors.system.light.neutral
      },
      fontWeight: '500',
      fontSize: '24px',
    },
    '& .MuiInputBase-root': {
      borderRadius: '5px',
      minHeight: 40,
      fontSize: 24,
      fontWeight: 700,
      paddingLeft: 12,
      paddingRight: 14,
      border: 'none',
      boxShadow: 'none',
      '& .MuiInputBase-input': {
        padding: '6px 0px 7px 0px',
        textAlign: 'center',

        '&.MuiInputBase-inputAdornedStart': {
          marginLeft: -28,
        },
        '&.MuiInputBase-inputAdornedEnd': {
          marginRight: -28,
        },
      },
      '& .MuiSelect-select:focus': {
        background: 'none',
      },
    },
    '& .MuiInput-underline:before, & .MuiInput-underline:hover:before, & .MuiInput-underline:after':
      {
        borderBottom: 'none',
      },
  },
  label: {
    textAlign: 'center',
    color: colors.system.light.neutral,
    fontWeight: 700,
    fontSize: 12,
    lineHeight: '130%',
  },
})
