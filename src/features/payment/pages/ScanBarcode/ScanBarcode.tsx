import React from 'react'
import { Box } from '@material-ui/core'
import { StoreState } from 'redux/state'
import { Loader } from 'components/Loader'
import { useStyles } from './ScanBarcode.style'
import { useDispatch, useSelector } from 'react-redux'
import { PageContainer } from 'components/PageContainer'
import { updatePaymentData } from 'features/payment/redux/actions'
import { BarcodeScanner } from 'features/payment/components/BarcodeScanner'
import { BarcodeHeader } from 'features/payment/components/BarcodeHeader'
import { OrientationBarIcon } from 'features/payment/components/OrientationBarIcon'
import { EnterCodeButton } from 'features/payment/components/EnterCodeButton'

export const ScanBarcode: React.FC = () => {
  const styles = useStyles()
  const dispatch = useDispatch()

  const paymentState = useSelector((state: StoreState) => state.payment)
  const { loading } = paymentState

  React.useEffect(() => {
    dispatch(updatePaymentData())
  }, [])

  return (
    <PageContainer>
      <Box className={styles.mainContainer}>
        <Box className={styles.containerfooter}>
          <Box className={styles.typeText}>
            <EnterCodeButton />
          </Box>
        </Box>
        <OrientationBarIcon />
        <BarcodeHeader />
        <Loader open={loading} />
      </Box>
      <BarcodeScanner />
    </PageContainer>
  )
}
