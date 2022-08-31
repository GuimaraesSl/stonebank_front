import React from 'react'
import { AppBar } from 'components/AppBar'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Button } from 'components/Button'
import { Close } from '@material-ui/icons'
import { cancelLabel } from 'constants/buttons/labels'
import { PageContainer } from 'components/PageContainer'
import { TextField } from 'components/TextField'
import { Box } from '@material-ui/core'
import { ProcessPageFooterButton } from 'components'
import { AccountRoutes } from 'features/account/constants/routes'
import { useStyles } from './BankPixTransferDescription.style'

interface BankPixTransferDescriptionViewProps {
  transferenceTags?: string[]
  description: string
  openTagEditPopUp: boolean
  loading?: boolean
  onDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onEditTagsClose: VoidFunction
  onEditTagsButtonClick: VoidFunction
  onConfirmButtonClick: VoidFunction
  onCancelButtonClick: VoidFunction
  onTagClick: (event: string) => void
}

export const BankPixTransferDescriptionView: React.FC<
  BankPixTransferDescriptionViewProps
> = ({
  transferenceTags,
  description,
  openTagEditPopUp,
  loading,
  onDescriptionChange,
  onEditTagsClose,
  onEditTagsButtonClick,
  onConfirmButtonClick,
  onCancelButtonClick,
  onTagClick,
}) => {
  const style = useStyles()

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
                startIcon={<Close color="inherit" />}
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
            title="Transferência com Pix"
            subtitle="Quer enviar uma mensagem?"
            description="Você pode inserir uma descrição ou mensagem para o recebedor"
          />
        }
        main={
          <React.Fragment>
            <Box component="form" onSubmit={onConfirmButtonClick}>
              <TextField
                label="Envie uma mensagem(opcional)"
                placeholder="Escreva sua mensagem"
                value={description}
                onChange={onDescriptionChange}
              />
              {/* 
                  <Typography
                    variant="subtitle1"
                    className={styles.importantWarning}
                  >
                    <strong>Tags (opcional)</strong>
                  </Typography>
                  <Typography className={styles.txtalert}>
                    Insira marcações para identificar seus gastos. Use nossa
                    sugestão ou personalize as tags.
                  </Typography>
                  <Grid container spacing={1}>
                    {transferenceTags?.map(tag => (
                      <Grid item key={tag}>
                        <TagChip label={tag} onClick={onTagClick} />
                      </Grid>
                    ))}
                  </Grid>
                  <Box className={styles.buttonTagFloating}>
                    <ButtonWithFloatingIcon onClick={onEditTagsButtonClick}>
                      Editar TAG
                    </ButtonWithFloatingIcon>
                  </Box>
                  <TagEditPopUp
                    open={openTagEditPopUp}
                    onSaveTags={tags => dispatch(updatePixTransfer({ tags }))}
                    onClose={onEditTagsClose}
                  /> 
              */}
            </Box>
          </React.Fragment>
        }
        footer={
          <Box className={style.footer}>
            <ProcessPageFooterButton backButton />
            <ProcessPageFooterButton
              forwardButton
              onClick={onConfirmButtonClick}
            />
          </Box>
        }
      />
      {/* <Loader open={loading!} /> */}
    </PageContainer>
  )
}
