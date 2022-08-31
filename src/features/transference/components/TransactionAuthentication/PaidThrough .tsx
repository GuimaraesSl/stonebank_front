import { Box } from '@material-ui/core'
import React from 'react'
import { useStyles } from './TransactionAuthentication.style'
interface PaidThroughProps {
  payment: string
}
export const PaidThrough: React.FC<PaidThroughProps> = ({ payment }) => {
  return (
    <Box>
      Pago via:
      <strong> {payment} </strong>
    </Box>
  )
}
