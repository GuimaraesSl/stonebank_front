import React from 'react'
import { useHistory } from 'react-router-dom'
import { Box } from '@material-ui/core'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { ListButtonRadio } from 'features/card/components/ListButton/ListButtonRadio'
import { useStyles } from './BlockingReason.style'
import { AccountRoutes } from 'features/account/constants/routes'
import { CardRoutes } from 'features/card/constants/routes'
import { useDispatch } from 'react-redux'
import { selectedReason } from 'features/card/redux/actions'
import { ReasonCode } from 'features/card/redux/models/reasonCodeEnum'

export const BlockingReason: React.FC = () => {
  const history = useHistory()
  const styles = useStyles()
  const dispatch = useDispatch()

  const [selectedValue, setSelectedValue] = React.useState<string>('')
  const [isDisable, setIsDisable] = React.useState<boolean>(true)

  const onCancelButtonClick = () => {
    history.push(CardRoutes.cardOption)
  }

  const onNextButtonClick = () => {
    if (selectedValue === 'Roubo') dispatch(selectedReason(ReasonCode.Stolen))
    if (selectedValue === 'Perca') dispatch(selectedReason(ReasonCode.Lost))
    if (selectedValue === 'Suspeita de fraude')
      dispatch(selectedReason(ReasonCode.SuspectedFraud))
    if (selectedValue === 'Falha ou perca na entrega')
      dispatch(selectedReason(ReasonCode.FailureOrLossOnDelivery))
    history.push(CardRoutes.reissueWarning)
  }

  React.useEffect(() => {
    if (selectedValue) setIsDisable(false)
  }, [selectedValue])

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
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={
          <Box className={styles.description}>
            <ProcessDescriptionHeader
              title="Segunda via do cartão"
              subtitle="Qual o motivo do bloqueio do cartão?"
              description="ATENÇÃO! Seu cartão atual será cancelado e um novo será enviado. Essa ação não pode ser desfeita."
            />
          </Box>
        }
        main={
          <Box className={styles.listOptions}>
            <ListButtonRadio
              title="Roubo"
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            ></ListButtonRadio>
            <ListButtonRadio
              title="Perca"
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            ></ListButtonRadio>
            <ListButtonRadio
              title="Suspeita de fraude"
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            ></ListButtonRadio>
            <ListButtonRadio
              title="Falha ou perca na entrega"
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            ></ListButtonRadio>
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                palette="primary"
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onNextButtonClick}
                disabled={isDisable}
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
