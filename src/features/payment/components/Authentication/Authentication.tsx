import { Typography } from '@material-ui/core'
import React from 'react'
import { useStyle } from './Authentication.style'

interface AuthenticationProps {
  controlProtocol?: string
  internalProtocol?: string
}

export const Authentication: React.FC<AuthenticationProps> = ({
  controlProtocol,
  internalProtocol,
}) => {
  const style = useStyle()
  return (
    <div className={style.autenticationContent} data-test-id="authentication">
      <Typography variant="subtitle2">Autenticação</Typography>
      <Typography variant="body2">
        Pago Via:{' '}
        <span className={style.customTextPaymentType}>Open Source Bank</span>{' '}
      </Typography>
      <Typography variant="subtitle2">
        Controle/Protocolo:{' '}
        <span className={style.customText}>{controlProtocol}</span>{' '}
      </Typography>
      <Typography variant="subtitle2">
        Protocolo Interno:{' '}
        <span className={style.customText}>{internalProtocol ?? '---'}</span>
      </Typography>
    </div>
  )
}
