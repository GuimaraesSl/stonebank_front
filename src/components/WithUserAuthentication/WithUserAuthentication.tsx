import React from 'react'
import { Redirect, Route, RouteProps, useHistory } from 'react-router-dom'
import { AuthenticationRoutes } from 'features/authentication/constants/routes'
import { useToken } from 'hooks/useToken'
import { validateToken } from 'features/authentication/utils'

interface UserAuthenticationRouteProps extends RouteProps {
  protectedRoute?: boolean | undefined
}
export const WithUserAuthentication: React.FC<UserAuthenticationRouteProps> = ({
  protectedRoute,
  component,
  ...rest
}) => {
  const token = useToken()
  let tokenIsValid = validateToken(token!)
  if (!protectedRoute) return <Route {...rest} component={component} />

  const render = ((Component: any) => (routeProps: RouteProps) => {
    if (!tokenIsValid) return <Redirect to={AuthenticationRoutes.signIn} />

    return <Component {...routeProps} />
  })(component)

  return <Route {...rest} render={render} />
}
