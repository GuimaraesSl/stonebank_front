import { createTheme, lighten } from '@material-ui/core'

type Color = {
  shade100: string
  shade99: string
  shade95: string
  shade90: string
  shade80: string
  shade70: string
  shade60: string
  shade50: string
  shade40: string
  shade30: string
  shade20: string
  shade10: string
  shade0: string
}

type SystemColors = {
  primary: string
  onPrimary: string
  primaryContainer: string
  onPrimaryContainer: string
  secondary: string
  onSecondary: string
  secondaryContainer: string
  onSecondaryContainer: string
  tertiary: string
  onTertiary: string
  tertiaryContainer: string
  onTertiaryContainer: string
  error: string // error.shade40
  onError: string
  errorContainer: string
  onErrorContainer: string
  background: string // neutral.shade99
  onBackground: string // neutral.shade10
  surface: string
  onSurface: string
  surfaceVariant: string
  onSurfaceVariant: string
  outline: string
  inverseOnSurface: string
  inverseSurface: string
  neutral: string
  neutralVariant: string
}

type ReadOnlyColors = {
  surface: string
  surface1: string
  surface2: string
  surface3: string
  surface4: string
  surface5: string
  black: string
  white: string
}

type Palette = {
  system: {
    light: SystemColors
    dark: SystemColors
  }
  readOnly: {
    light: ReadOnlyColors
    dark: ReadOnlyColors
  }
  primary: Color
  secondary: Color
  tertiary: Color
  neutral: Color
  neutralVariant: Color
  error: Color
  source: {
    seed: string
    primary: string
    secondary: string
    terciary: string
    neutral: string
    neutralVariant: string
    error: string
  }
}

export const colors: Palette = {
  system: {
    light: {
      primary: '#323751',
      onPrimary: '#FFFFFF',
      primaryContainer: '',
      onPrimaryContainer: '',
      secondary: '#5F81A6',
      onSecondary: '#FFFFFF',
      secondaryContainer: '',
      onSecondaryContainer: '',
      tertiary: '',
      onTertiary: '',
      tertiaryContainer: '',
      onTertiaryContainer: '',
      error: '#BA1B1B',
      onError: '#FFFFFF',
      errorContainer: '',
      onErrorContainer: '',
      background: '#E8E8E8',
      onBackground: '#000000',
      surface: '#FFFFFF',
      onSurface: '#000000',
      surfaceVariant: '',
      onSurfaceVariant: '',
      outline: '#F9F9F9',
      inverseOnSurface: '',
      inverseSurface: '',
      neutral: '#555555',
      neutralVariant: '#40455F',
    },
    dark: {
      primary: '',
      onPrimary: '',
      primaryContainer: '',
      onPrimaryContainer: '',
      secondary: '',
      onSecondary: '',
      secondaryContainer: '',
      onSecondaryContainer: '',
      tertiary: '',
      onTertiary: '',
      tertiaryContainer: '',
      onTertiaryContainer: '',
      error: '',
      onError: '',
      errorContainer: '',
      onErrorContainer: '',
      background: '',
      onBackground: '',
      surface: '',
      onSurface: '',
      surfaceVariant: '',
      onSurfaceVariant: '',
      outline: '',
      inverseOnSurface: '',
      inverseSurface: '',
      neutral: '',
      neutralVariant: '',
    },
  },
  readOnly: {
    light: {
      surface: '',
      surface1: '',
      surface2: '',
      surface3: '',
      surface4: '',
      surface5: '#323751',
      black: '#000000',
      white: '#FFFFFF',
    },
    dark: {
      surface: '',
      surface1: '',
      surface2: '',
      surface3: '',
      surface4: '',
      surface5: '',
      black: '',
      white: '',
    },
  },
  primary: {
    shade100: '',
    shade99: '',
    shade95: '',
    shade90: '',
    shade80: '',
    shade70: '',
    shade60: '',
    shade50: '',
    shade40: '',
    shade30: '',
    shade20: '',
    shade10: '',
    shade0: '#656982',
  },
  secondary: {
    shade100: '',
    shade99: '',
    shade95: '',
    shade90: '',
    shade80: '',
    shade70: '',
    shade60: '',
    shade50: '',
    shade40: '',
    shade30: '',
    shade20: '',
    shade10: '',
    shade0: '',
  },
  tertiary: {
    shade100: '',
    shade99: '',
    shade95: '',
    shade90: '',
    shade80: '',
    shade70: '',
    shade60: '',
    shade50: '',
    shade40: '',
    shade30: '',
    shade20: '',
    shade10: '',
    shade0: '',
  },
  neutral: {
    shade100: '',
    shade99: '',
    shade95: '',
    shade90: '',
    shade80: '',
    shade70: '#ECECEC',
    shade60: '#EFEFEF',
    shade50: '#333333',
    shade40: '#555555',
    shade30: '#C4C4C4',
    shade20: '#CECECE',
    shade10: '#F9F9F9',
    shade0: '#FFFFFF',
  },
  neutralVariant: {
    shade100: '',
    shade99: '',
    shade95: '',
    shade90: '',
    shade80: '',
    shade70: '',
    shade60: '',
    shade50: '',
    shade40: '',
    shade30: '',
    shade20: '',
    shade10: '',
    shade0: '',
  },
  error: {
    shade100: '',
    shade99: '',
    shade95: '',
    shade90: '',
    shade80: '',
    shade70: '',
    shade60: '',
    shade50: '',
    shade40: '',
    shade30: '',
    shade20: '',
    shade10: '',
    shade0: '',
  },
  source: {
    seed: '#323751',
    primary: '',
    secondary: '#5F81A6',
    terciary: '',
    error: '#BA1B1B',
    neutral: '#555555',
    neutralVariant: '#40455F',
  },
}

export const theme = createTheme({
  palette: {
    common: {
      black: colors.readOnly.light.black,
      white: colors.readOnly.light.white,
    },
    success: {
      main: '#0CC260',
    },
    action: {
      disabledBackground: lighten(colors.system.light.neutral, 0.12),
      disabled: colors.system.light.neutral,
    },
    text: {
      primary: colors.system.light.primary,
    },
    primary: {
      main: colors.system.light.primary,
    },
    secondary: {
      main: colors.system.light.secondary,
    },
  },
  overrides: {
    MuiContainer: {
      root: {
        height: '100%',
      },
    },
    MuiButton: {
      root: {
        borderRadius: '6px',
        transition: 'all 120ms linear',
      },
      contained: {
        backgroundColor: colors.system.light.primary,
        color: colors.system.light.onPrimary,
        '&:hover': {
          backgroundColor: colors.system.light.primary,
          color: colors.system.light.onPrimary,
        },
      },
      containedPrimary: {
        backgroundColor: colors.system.light.primary,
        color: colors.system.light.onPrimary,
        '&:hover': {
          backgroundColor: colors.system.light.primary,
          color: colors.system.light.onPrimary,
        },
      },
      containedSecondary: {
        backgroundColor: colors.readOnly.light.white,
        color: colors.system.light.primary,
        '&:hover': {
          backgroundColor: colors.readOnly.light.surface,
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: '6px',
        borderWidth: '1.5px',
      },
    },
    MuiInputBase: {
      root: {
        borderRadius: '6px',
      },
    },
    MuiLink: {
      root: {
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
  },
})
