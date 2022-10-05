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
      fontWeight: '400',
      fontSize: '12px',
    },

    '& .MuiInputBase-root': {
      borderRadius: '100px',
      backgroundColor: colors.readOnly.light.white,
      minHeight: 56,
      fontSize: 16,
      fontFamily: "'Baloo Bhaina 2', cursive",
      paddingLeft: 12,
      paddingRight: 14,

      border: ({ variant }: TextFieldStylesProps) => {
        switch (variant) {
          case 'outlined':
            return `1px solid ${colors.readOnly.light.blackLight}60`
        }
      },

      '& .MuiInputBase-input': {
        padding: '0px 0px 0px 10px',
        textAlign: 'left',
        color: colors.readOnly.light.blackLight,

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
