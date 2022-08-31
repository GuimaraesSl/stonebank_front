import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Typography } from '@material-ui/core'
import { PageContainer } from 'components/PageContainer'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { AppBar } from 'components/AppBar'
import { AccountRoutes } from 'features/account/constants/routes'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { cancelLabel, nextLabel, skipLabel } from 'constants/buttons/labels'
import { ButtonAttachDocuments } from 'components/ButtonAttachDocuments'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { TransferenceRoutes } from 'features/transference/constants/routes'
import { useDispatch } from 'react-redux'
import { updateTransferenceData } from 'features/transference/redux/actions'
import { Attachment } from 'features/transference/redux/models/attachment'
import { Icon } from 'components/Icon'

export const AttachDocuments: React.FC = () => {
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
    dispatch(updateTransferenceData())
    history.replace(AccountRoutes.home)
  }

  const onNextButtonClick = () => {
    attachments.splice(0, 1)
    dispatch(
      updateTransferenceData({
        attachments: attachments,
      }),
    )
    history.push(TransferenceRoutes.summary)
  }

  React.useEffect(() => {
    if (attachments.length > 1) setValidation(true)
  }, [attachments, setValidation])

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
          <ProcessDescriptionHeader
            title="Transferência"
            subtitle="Deseja anexar arquivos para identificar sua transferência?"
            description="Adicione um arquivo para identicar melhor essa transferência em seu histórico."
          />
        }
        main={
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="body2" data-test-id="attach">
                <strong>Anexar:</strong>
              </Typography>
              <Typography variant="body2">
                Ex: boleto, conta de luz, entre outros
              </Typography>
            </Grid>
            <Grid item>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <ButtonAttachDocuments
                    title="Foto ou vídeo"
                    imagePath={<Icon name={'media'} />}
                    attachments={attachments}
                    setAttachments={setAttachments}
                  />
                </Grid>
                <Grid item>
                  <ButtonAttachDocuments
                    title="Documento"
                    imagePath={<Icon name={'document'} />}
                    attachments={attachments}
                    setAttachments={setAttachments}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        }
        footer={
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
        }
      />
    </PageContainer>
  )
}
