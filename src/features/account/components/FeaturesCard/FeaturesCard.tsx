import React from 'react'
import { Grid } from '@material-ui/core'
import { SquareButtonWithIcon } from 'components/SquareButtonWithIcon'
import { useHistory } from 'react-router'
import { TransferenceRoutes } from 'features/transference/constants/routes'
import { PaymentRoutes } from 'features/payment/constants/routes'
import { QrCodeTransferRoutes } from 'features/qrCodeTransfer/constants/routes'
import { useStyles } from './FeaturesCard.style'

interface FeaturesCardProps {
  className?: string
}

export const FeaturesCard: React.FC<FeaturesCardProps> = ({ className }) => {
  const history = useHistory()
  const styles = useStyles()

  const _getClassName = () => {
    let value = styles.featuresCard
    if (className) value = `${value} ${className}`
    return value
  }

  const onTransferButtonClick = () => {
    history.push(TransferenceRoutes.transference)
  }

  const onPaymentButtonClick = () => {
    history.push(PaymentRoutes.barcodePayment)
  }

  const onQrCodeTransferClick = () => {
    history.push(QrCodeTransferRoutes.qrCodeTransfer)
  }

  return (
    <Grid container className={_getClassName()} justify="space-around">
      <Grid item>
        <SquareButtonWithIcon
          label="Transferência"
          icon={'transfer'}
          onClick={onTransferButtonClick}
          data-test-id="transfer-button"
        />
      </Grid>
      <Grid item>
        <SquareButtonWithIcon
          label="Pagamento"
          icon={'payment'}
          onClick={onPaymentButtonClick}
          data-test-id="payment-button"
        />
      </Grid>
      <Grid item>
        <SquareButtonWithIcon
          label="QRCode"
          icon={'qrCode'}
          onClick={onQrCodeTransferClick}
          data-test-id="qrcode-transfer-link"
        />
      </Grid>
    </Grid>
  )
}
