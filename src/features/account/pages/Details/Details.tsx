import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Close } from '@material-ui/icons'
import { AppBar } from 'components/AppBar'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { Button } from 'components/Button'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { closeLabel } from 'constants/buttons/labels'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { DetailDescription } from 'features/account/components/DetailDescription'
import { TagsDescription } from 'features/account/components/Tags/TagsDescription'
import { PageContainer } from 'components/PageContainer'
import {
  closeAlert,
  getTransactionDetails,
} from 'features/account/redux/actions'
import { AccountRoutes } from 'features/account/constants/routes'
import { StoreState } from 'redux/state'
import { useStyles } from './Details.style'
import '_assets/css/forms/mainform.scss'

export const Details: React.FC = () => {
  const { state } = useLocation()
  const { loading, transactionDetails, errorMessage } = useSelector(
    (state: StoreState) => state.account,
  )

  const dispatch = useDispatch()
  const history = useHistory()
  const styles = useStyles()

  const { externalIdentifier, operationType } = state as any

  React.useEffect(() => {
    try {
      if (externalIdentifier && operationType)
        dispatch(getTransactionDetails(externalIdentifier, operationType))
    } catch (error: any) {}
  }, [])

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
                size="small"
                palette="secondary"
                startIcon={<Close />}
                onClick={onCancelButtonClick}
                data-test-id="cancel-button"
              >
                {closeLabel}
              </Button>
            }
          />
        }
        header={<ProcessDescriptionHeader title="Detalhes" />}
        main={
          <React.Fragment>
            <div className={styles.detailDescription}>
              <DetailDescription
                details={transactionDetails}
                operationType={operationType}
              />
            </div>
            <div className={styles.detailInfoTagsTags}>
              {transactionDetails?.tags?.map(i => (
                <TagsDescription tag={i} key={i} />
              ))}
            </div>
          </React.Fragment>
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
