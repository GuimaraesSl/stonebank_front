import React from 'react'
import { Container, Typography } from '@material-ui/core'
import { Loader } from 'components/Loader'
import { logout as signOut } from 'features/authentication/redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { Redirect } from 'react-router'
import { OnboardingRoutes } from 'features/onboarding/constants/routes'

export const SignOut: React.FC = () => {
  const state = useSelector((store: StoreState) => store.auth)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(signOut())
  }, [dispatch])

  if (!state.user) return <Redirect to={OnboardingRoutes.welcome} />

  return (
    <Container>
      <Typography data-test-id="temporary-password-text">Saindo...</Typography>
      {state.loading && <Loader open={true} />}
    </Container>
  )
}
