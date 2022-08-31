import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Divider } from 'components/Divider'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { PageContainer } from 'components/PageContainer'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { ReceiptDescription } from 'features/account/components/ReceiptDescription'
import { Authentication } from 'features/account/components/Authentication'
import { AccountRoutes } from 'features/account/constants/routes'
import { closeLabel } from 'constants/buttons/labels'
import { StoreState } from 'redux/state'
import {
  closeAlert,
  getTransactionReceipt,
} from 'features/account/redux/actions'

import { useStyles } from './Receipt.style'
import '_assets/css/forms/mainform.scss'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon'

export const Receipt: React.FC = () => {
  const { state } = useLocation()
  const { loading, transactionReceipt, errorMessage } = useSelector(
    (state: StoreState) => state.account,
  )

  const dispatch = useDispatch()
  const history = useHistory()
  const styles = useStyles()

  const showShareButton =
    (window as any).flutter_inappwebview || navigator.share

  React.useEffect(() => {
    try {
      const { externalIdentifier, operationType } = state as any

      if (externalIdentifier && operationType)
        dispatch(getTransactionReceipt(externalIdentifier, operationType))
    } catch (error: any) {}
  }, [])

  const onSaveReceipt = () => {
    const webview = (window as any).flutter_inappwebview
    const receiptUrl = transactionReceipt?.receiptUrl

    if (webview)
      return webview.callHandler('onDownloadTransactionReceipt', receiptUrl)

    window.open(receiptUrl, '_blank')
  }

  const onShareReceipt = () => {
    const webview = (window as any).flutter_inappwebview
    const receiptUrl = transactionReceipt?.receiptUrl

    if (webview)
      return webview.callHandler('onShareTransactionReceipt', receiptUrl)

    navigator.share({
      title: 'Compartilhar comprovante',
      url: receiptUrl,
    })
  }

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.bankStatement)
  }

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
                {closeLabel}
              </Button>
            }
          />
        }
        header={<ProcessDescriptionHeader title="Comprovante" />}
        main={
          <Grid
            container
            direction="column"
            justify="space-between"
            className={styles.content}
          >
            <Grid item>
              <ReceiptDescription receipt={transactionReceipt} />
            </Grid>
            <Grid className={styles.footer}>
              <Grid>
                <Divider />
                <Grid className={styles.authenticationDetails}>
                  <Authentication
                    controlProtocol={transactionReceipt?.controlCode}
                    internalProtocol={transactionReceipt?.protocolCode}
                  />
                </Grid>
                <Grid className={styles.buttons}>
                  <ButtonWithFloatingIcon
                    size="large"
                    onClick={onSaveReceipt}
                    data-test-id="save-button"
                  >
                    Salvar
                  </ButtonWithFloatingIcon>
                  {showShareButton && (
                    <ButtonWithFloatingIcon
                      data-test-id="share-button"
                      size="large"
                      onClick={onShareReceipt}
                    >
                      Compartilhar
                    </ButtonWithFloatingIcon>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        }
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert
          severity="error"
          title="Erro"
          message={errorMessage}
          onClose={() => dispatch(closeAlert())}
        />
      )}
    </PageContainer>
  )
}
