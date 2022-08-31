import React from 'react'
import { useHistory } from 'react-router'
import { PaymentRoutes } from 'features/payment/constants/routes'
import { getDetailsByNumericSequence } from 'features/payment/redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { getBaseRequestData } from '_utils/http'
import { StoreState } from 'redux/state'
import { HttpClient } from '_config/http'
import { Box } from '@material-ui/core'
//@ts-ignore
import ScanditBarcodeScanner from 'scandit-sdk-react'
import { BarcodePicker } from 'scandit-sdk/build/main/lib/barcodePicker/barcodePicker'
import { ScanSettings } from 'scandit-sdk/build/main/lib/scanSettings'
import { Barcode } from 'scandit-sdk/build/main/lib/barcode'
import { PaymentError } from 'features/payment/components/PaymentError'
import { useStyles } from './BarCodeScanner.style'

export const BarcodeScanner: React.FC = () => {
  const style = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const [key, setKey] = React.useState('')
  const [failed, setFailed] = React.useState(false)

  const onReader = (barcode: string) => {
    history.push(PaymentRoutes.details)
    dispatch(getDetailsByNumericSequence(barcode))
  }

  const scanSettings = new ScanSettings({
    enabledSymbologies: [Barcode.Symbology.INTERLEAVED_2_OF_5],
  })
  scanSettings
    .getSymbologySettings(Barcode.Symbology.INTERLEAVED_2_OF_5)
    .setActiveSymbolCounts([44, 48])
    .setEnabled(true)

  const token = useSelector((state: StoreState) => state.auth.token)

  React.useEffect(() => {
    getLicenseKey()
  }, [])

  const _onScanError = () => {
    setFailed(true)
  }

  const getLicenseKey = async () => {
    try {
      const { url, defaultHeaders } = await getBaseRequestData(
        '/BoletoPayment/FindScanLicenseKey',
      )

      const response = await HttpClient.get(url, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      let licenseKey = response.headers['x-license-key']
      setKey(licenseKey)
    } catch (error: any) {}
  }

  return (
    <Box className={style.camera}>
      {key && (
        <ScanditBarcodeScanner
          licenseKey={key}
          laserArea={{ x: 0, y: 0, width: 1, height: 1 }}
          vibrateOnScan={false}
          guiStyle={BarcodePicker.GuiStyle.NONE}
          videoFit={BarcodePicker.ObjectFit.COVER}
          scanSettings={scanSettings}
          playSoundOnScan={true}
          blurryRecognition={true}
          enableTorchToggle={true}
          enableCameraSwitcher={false}
          enableTapToFocus={true}
          engineLocation={'https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build'}
          onScan={(scanResult: any) => onReader(scanResult.barcodes[0].data)}
          onScanError={_onScanError}
        />
      )}
      {failed && (
        <Box className={style.wrapper}>
          <PaymentError />
        </Box>
      )}
    </Box>
  )
}
