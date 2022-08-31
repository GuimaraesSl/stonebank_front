import { Grid } from '@material-ui/core'
import React from 'react'
import { ExternalProtocol } from './ExternalProtocol '
import { InternalProtocol } from './InternalProtocol'
import { PaidThrough } from './PaidThrough '
import { useStyles } from './TransactionAuthentication.style'
interface TransactionAuthenticationProps {
  payment?: string
  controlProtocol?: string
  internalProtocol?: string
}
export const TransactionAuthentication: React.FC<
  TransactionAuthenticationProps
> = ({ payment, controlProtocol, internalProtocol }) => {
  const styleAuthentication = useStyles()
  return (
    <Grid
      className={styleAuthentication.autenticationContent}
      data-test-id="transaction-auth"
    >
      <Grid> Autenticação </Grid>
      {payment ? <PaidThrough payment={payment} /> : ''}
      {controlProtocol ? (
        <ExternalProtocol controlProtocol={controlProtocol} />
      ) : (
        ''
      )}
      {internalProtocol ? (
        <InternalProtocol internalProtocol={internalProtocol} />
      ) : (
        ''
      )}
    </Grid>
  )
}
