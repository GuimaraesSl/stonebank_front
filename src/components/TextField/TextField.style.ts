import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export interface TextFieldStylesProps {
  variant: 'outlined' | 'filled'
}

export const useStyles = makeStyles({
  textField: {
    '& .MuiInputLabel-formControl': {
      transform: 'none',
      color: colors.system.light.neutral,
      fontWeight: '500',
      fontSize: '12px',
    },
    '& .MuiInputBase-root': {
      borderRadius: '5px',
      minHeight: 40,
      fontSize: 18,
      paddingLeft: 12,
      paddingRight: 14,
      border: ({ variant }: TextFieldStylesProps) => {
        switch (variant) {
          case 'outlined':
            return `0.8px solid ${colors.neutral.shade30}`
        }
      },
      boxShadow: ({ variant }: TextFieldStylesProps) => {
        switch (variant) {
          case 'filled':
            return '0px 2px 2px rgba(0, 0, 0, 0.15)'
        }
      },
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
  textFieldError: {
    '& .MuiInputBase-root': {
      borderRadius: '5px',
      minHeight: 40,
      fontSize: 18,
      paddingLeft: 12,
      paddingRight: 14,
      border: ({ variant }: TextFieldStylesProps) => {
        switch (variant) {
          case 'outlined':
            return `0.8px solid ${colors.system.light.error}`
        }
      },
      '&.MuiInputBase-inputAdornedStart': {
        marginLeft: -28,
      },
      '&.MuiInputBase-inputAdornedEnd': {
        marginRight: -28,
      },
      '& .MuiInput-underline:before, & .MuiInput-underline:hover:before, & .MuiInput-underline:after':
        {
          borderBottom: 'none',
        },
    },
  },
})
