import { Box } from '@material-ui/core'
import React from 'react'
interface InternalProtocolProps {
  internalProtocol: string
}
export const InternalProtocol: React.FC<InternalProtocolProps> = ({
  internalProtocol,
}) => {
  return <Box>Protocolo Interno: {internalProtocol}</Box>
}
