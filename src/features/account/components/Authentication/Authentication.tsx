import { Box, Typography } from '@material-ui/core'
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
    <Box
      className={style.autenticationContent}
      data-test-id="authentication-content"
    >
      <Typography>Autenticação</Typography>
      <Typography>
        Pago via:&nbsp;<strong>Open Source Bank</strong>
      </Typography>
      <Typography>
        Controle/Protocolo:&nbsp;
        {controlProtocol ?? '---'}
      </Typography>
      <Typography variant="subtitle2">Protocolo Interno:</Typography>
      <Typography variant="body2" className={style.wordBreak}>
        {internalProtocol ?? '---'}
      </Typography>
    </Box>
  )
}
