/* eslint-disable react-hooks/exhaustive-deps */
import {
  closeAlert,
  getAccountDashboard,
  setBankStatementFilters,
} from 'features/account/redux/actions'
import { SuccessAccountState } from 'features/account/redux/state'
import { updatePaymentData } from 'features/payment/redux/actions'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StoreState } from 'redux/state'
import { HomeView } from './Home.view'
import { useHistory, useLocation } from 'react-router-dom'
import { AuthenticationRoutes } from 'features/authentication/constants/routes'
import { logout as signOut } from 'features/authentication/redux/actions'
import { CookiesProvider, useCookies } from 'react-cookie'

export const Home: React.FC = () => {
  const [cookies, setCookie] = useCookies(['login-token'])
  const [showAccountSheet, setShowAccountSheet] = React.useState(false)
  const { accountState, account, userId, tokenAccess } = useSelector(
    (state: StoreState) => ({
      userId: state.auth.user?.id,
      accountState: state.account,
      account: state.account.account,
      tokenAccess: state.auth.user!.tokenAccess,
    }),
  )

  const { loading, errorMessage } = accountState
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  React.useEffect(() => {
    if (location.state) {
      return () => {
        if (history.action === 'POP') {
          dispatch(signOut())
          history.replace(AuthenticationRoutes.signIn)
        }
      }
    }
  }, [history])

  React.useEffect(() => {
    dispatch(setBankStatementFilters({}))
  }, [])

  React.useEffect(() => {
    setCookie('login-token', tokenAccess, {
      expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    })
  }, [cookies])

  React.useEffect(() => {
    dispatch(updatePaymentData())
  }, [])

  React.useEffect(() => {
    if (
      !(accountState instanceof SuccessAccountState) ||
      account?.accountId === undefined
    ) {
      return
    }

    const webview = (window as any)?.flutter_inappwebview
    if (!webview) return

    webview.callHandler('onRegisterDevice', ...[userId, account?.accountId])
  }, [accountState.account?.accountId])

  React.useEffect(() => {
    dispatch(getAccountDashboard(accountState.account?.accountId))
  }, [dispatch])

  const onAlertClose = React.useCallback(() => {
    dispatch(closeAlert())
  }, [])

  const toggleAccountSheet = React.useCallback(() => {
    setShowAccountSheet(!showAccountSheet)
  }, [showAccountSheet])

  return (
    <CookiesProvider>
      <HomeView
        account={account}
        errorMessage={errorMessage}
        loading={loading}
        showAccountSheet={showAccountSheet}
        onAlertClose={onAlertClose}
        toggleAccountSheet={toggleAccountSheet}
      />
    </CookiesProvider>
  )
}
