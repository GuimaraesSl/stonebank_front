import React from 'react'
import { Redirect } from 'react-router-dom'

const localStorageKey = 'accessedRoutes'

interface WithFirstAccessControlProps {
  firstAccessRoute: string
}
export const WithFirstAccessControl = (
  WrappedComponent: React.ComponentType<any>,
  firstAccessRoute: string,
) => {
  const Component = (props: Omit<any, keyof WithFirstAccessControlProps>) => {
    let alreadyAccessedRoutes: string | string[] | null =
      localStorage.getItem(localStorageKey)
    alreadyAccessedRoutes = alreadyAccessedRoutes
      ? (JSON.parse(alreadyAccessedRoutes) as string[])
      : []

    if (!alreadyAccessedRoutes.includes(firstAccessRoute)) {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify([...alreadyAccessedRoutes, firstAccessRoute]),
      )
      return <Redirect to={firstAccessRoute} />
    }

    return <WrappedComponent {...props} />
  }

  return Component
}
