import React from 'react'
import { AccountRoutes } from 'features/account/constants/routes'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { useHistory } from 'react-router-dom'
import { PageContainer } from 'components/PageContainer'
import { Box, Grid, Typography } from '@material-ui/core'
import { useStyles } from 'features/taxPayment/pages/Fgts/PaymentFgtsBarCode/PaymentFgtsBarCode.style'
import { TaxPaymentRoutes } from 'features/taxPayment/constants/routes'
import { AppBar } from 'components/AppBar'
import { TextField } from 'components/TextField'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { useMask } from 'hooks/useMask'
import { Button } from 'components/Button'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { updateFgtsPaymentData } from 'features/taxPayment/redux/actions'
import { maskBarcode, MaskBarCodeFgts } from '_utils/masks/barCode'

export const PaymentFgtsBarCode: React.FC = () => {
  const history = useHistory()
  const styles = useStyles()
  const [isValid, setIsValid] = React.useState(false)
  const [inputBarCode, setInputBarCode] = useMask(MaskBarCodeFgts)

  const dispatch = useDispatch()

  const onBarCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputBarCode(event.target.value)
  }

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
    dispatch(updateFgtsPaymentData())
  }

  const onSubmit = (event: React.FormEvent) => {
    dispatch(
      updateFgtsPaymentData({
        barCode: inputBarCode,
      }),
    )
    event.preventDefault()
    history.push(TaxPaymentRoutes.paymentFgtsCodeRevenue)
  }

  React.useEffect(() => {
    setIsValid(!(inputBarCode.length !== 51))
  }, [inputBarCode.length])

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={
          <AppBar
            homeRoute={AccountRoutes.home}
            action={
              <Button
                palette="secondary"
                size="small"
                startIcon={<Close color="primary" />}
                onClick={onCancelButtonClick}
                data-test-id="cancel-button"
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={
          <Typography variant="h3" className={styles.title}>
            Impostos - FGTS <br />
          </Typography>
        }
        main={
          <Box className="barCodeSubheader">
            <Grid>
              <TextField
                multiline={true}
                rows="2"
                placeholder=""
                label="Codigo de Barras"
                value={inputBarCode}
                onChange={onBarCodeChange}
                data-test-id="change-barcode" 
              ></TextField>
            </Grid>
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                disabled={!isValid}
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onSubmit}
                data-test-id="submit-button"
              >
                {nextLabel}
              </Button>
            }
          />
        }
      />
    </PageContainer>
  )
}
