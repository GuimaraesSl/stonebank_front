import React from 'react'
import { Typography } from '@material-ui/core'
import { useStyles } from './PaymentError.style'

export const PaymentError: React.FC = () => {
  const styles = useStyles()

  return (
    <Typography className={styles.errorPayment} data-test-id="payment-error">
      <Typography className={styles.fontPayment}>
        Pagamento não reconhecido, tente afastar ou aproximar o dispositivo
      </Typography>
    </Typography>
  )
}
