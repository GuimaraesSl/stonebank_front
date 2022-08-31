import React, { useState } from 'react'
import { AppBar } from 'components/AppBar'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { TitleAndDescriptionTextAttach } from 'features/payment/components/TitleAndDescriptionTextAttach'
//import { ButtonAttachDocuments } from 'features/payment/components/ButtonAttachDocuments'
import { PaymentRoutes } from 'features/payment/constants/routes'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { cancelLabel, nextLabel, skipLabel } from 'constants/buttons/labels'
import { AccountRoutes } from 'features/account/constants/routes'
import { useHistory } from 'react-router-dom'
import '_assets/css/forms/mainform.scss'
import { Icon } from 'components/Icon'

import { ButtonAttachDocuments } from 'components/ButtonAttachDocuments'
import { Attachment } from 'features/transference/redux/models/attachment'
import { useDispatch } from 'react-redux'
import { updatePaymentData } from 'features/payment/redux/actions'

export const PaymentAttach: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [validation, setValidation] = React.useState(false)

  const [attachments, setAttachments] = useState<Attachment[]>([
    {
      content: '',
      extension: '',
    },
  ])

  const onCancelButtonClick = () => {
    dispatch(updatePaymentData())
    history.replace(AccountRoutes.home)
  }
  const onNextButtonClick = () => {
    attachments.splice(0, 1)
    dispatch(
      updatePaymentData({
        attachments: attachments,
      }),
    )
    history.push(PaymentRoutes.summary)
  }

  React.useEffect(() => {
    if (attachments.length > 1) setValidation(true)
  }, [attachments, setValidation])

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
        <>
          <ProcessDescriptionHeader
            title="Pagamento"
            subtitle="Deseja anexar arquivos para identificar sua transferência?"
            description="Adicione um arquivo para identificar melhor essa transferência em seu histórico."
          />
        </>
      }
      main={
        <>
          <TitleAndDescriptionTextAttach
            title="Anexar:"
            description="Ex: boleto, conta de luz, entre outros."
          />
          <ButtonAttachDocuments
            title="Foto ou vídeo"
            imagePath={<Icon name={'media'} />}
            attachments={attachments}
            setAttachments={setAttachments}
          />
          <ButtonAttachDocuments
            title="Documento"
            imagePath={<Icon name={'document'} />}
            attachments={attachments}
            setAttachments={setAttachments}
          />
        </>
      }
      footer={
        <>
          <ProcessPageFooter
            primaryButton={
              <Button
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onNextButtonClick}
                data-test-id="next-button"
              >
                {validation ? nextLabel : skipLabel}
              </Button>
            }
          />
        </>
      }
    />
  )
}
