import React from 'react'
import { useHistory } from 'react-router-dom'
import { KeyboardArrowRight, Close } from '@material-ui/icons'
import { Box } from '@material-ui/core'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { ListButtonRadio } from 'features/card/components/ListButton/ListButtonRadio'
import { useStyles } from './CancelReason.style'
import { AccountRoutes } from 'features/account/constants/routes'
import { CardRoutes } from 'features/card/constants/routes'

export const CancelReason: React.FC = () => {
  const [selectedValue, setSelectedValue] = React.useState('')
  const history = useHistory()
  const styles = useStyles()

  const onCancelButtonClick = () => {
    history.push(CardRoutes.cardOption)
  }

  const onNextButtonClick = () => {
    history.push(CardRoutes.cancelWarning)
  }

  return (
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
        <Box className={styles.description}>
          <ProcessDescriptionHeader
            title="Cancelar cartão"
            subtitle="Qual o motivo do cancelamento?"
            description="ATENÇÃO! Essa ação não pode ser desfeita. Você pode bloquear temporariamente em 'Gerenciamento de cartões'"
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
            title="Não quero usar esse cartão"
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
              data-test-id="next-button"
            >
              {nextLabel}
            </Button>
          }
        />
      }
    />
  )
}
