import React from 'react'
import { Box } from '@material-ui/core'
import { AppBar } from 'components/AppBar'
import { voucher } from './store'
import { useStyles } from './TransferReceipt.style'
import { autentication } from './storeAutentication'
import { ReceiptSummary } from '../../components/ReceiptSummary'
import { TransactionAuthentication } from '../../components/TransactionAuthentication'
import { TransferenceRoutes } from '../../constants/routes'
import { AccountRoutes } from 'features/account/constants/routes'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Button } from 'components/Button'
import { Close } from '@material-ui/icons'
import { cancelLabel, saveLabel, shareLabel } from 'constants/buttons/labels'
import { PageContainer } from 'components/PageContainer'
import { useHistory } from 'react-router-dom'
import { Icon } from 'components/Icon'

export const TransferReceipt: React.FC = () => {
  const history = useHistory()
  const styles = useStyles()

  const onCancelButtonClick = () => {
    history.replace(TransferenceRoutes.transference)
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
                {cancelLabel}
              </Button>
            }
          />
        }
        header={<ProcessDescriptionHeader title="Comprovante" />}
        main={
          <React.Fragment>
            <Box className={styles.description}>
              {voucher.map(v => (
                <ReceiptSummary
                  value={v.value}
                  account={v.account}
                  taxId={v.cpf}
                  data={v.data}
                  description={v.description}
                  data-test-id="receipt-summary"
                />
              ))}
            </Box>
            <Box className={styles.separator} />
            <Box className={styles.bottom}>
              {autentication.map(i => (
                <TransactionAuthentication
                  payment={i.payment}
                  controlProtocol={i.controlProtocol}
                  internalProtocol={i.internalProtocol}
                />
              ))}
            </Box>
            <Box className={styles.buttons}>
              <ButtonWithFloatingIcon
                icon={<Icon name={'buttonBg'} />}
                size="large"
                data-test-id="save-button"
              >
                {saveLabel}
              </ButtonWithFloatingIcon>
              <ButtonWithFloatingIcon
                icon={<Icon name={'buttonBg'} />}
                size="large"
                data-test-id="share-button"
              >
                {shareLabel}
              </ButtonWithFloatingIcon>
            </Box>
          </React.Fragment>
        }
      />
    </PageContainer>
  )
}
