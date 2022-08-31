import { Box } from '@material-ui/core'
import React from 'react'
interface ExternalProtocolProps {
  controlProtocol?: string
}
export const ExternalProtocol: React.FC<ExternalProtocolProps> = ({
  controlProtocol,
}) => {
  return <Box>Controle/Protocolo: {controlProtocol}</Box>
}
