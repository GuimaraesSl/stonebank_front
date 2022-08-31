import DateFnsUtils from '@date-io/date-fns'
import { CssBaseline, Box, MuiThemeProvider } from '@material-ui/core'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { Router } from 'components/Router'
import { theme } from '_config/theme'
import { StoreProvider } from 'redux/StoreProvider'
import { useStyle } from './App.style'
import { datePickerLocale } from '_translate'
import { ConfigContextProvider } from '_config'

export const App: React.FC = () => {
  const style = useStyle()

  return (
    <StoreProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={datePickerLocale}>
        <MuiThemeProvider theme={theme}>
          <ConfigContextProvider>
            <CssBaseline />
            <Box className={style.app}>
              <Router />
            </Box>
          </ConfigContextProvider>
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    </StoreProvider>
  )
}
