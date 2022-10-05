import React from "react";
import { AppBar } from "components/AppBar";
import { ProcessDescriptionHeader } from "components/ProcessDescriptionHeader";
import { PixRoutes } from "../../constants/routes";
import { ProcessPageLayout } from "components/ProcessPageLayout";
import { Button } from "components/Button";
import { Close, KeyboardArrowRight } from "@material-ui/icons";
import { cancelLabel, nextLabel } from "constants/buttons/labels";
import { ProcessPageFooter } from "components/ProcessPageFooter";
import { PageContainer } from "components/PageContainer";
import { TextField } from "components/TextField";
import { ButtonWithFloatingIcon } from "components/ButtonWithFloatingIcon/ButtonWithFloatingIcon";
import { TagEditPopUp } from "components/TagEditPopUp";
import { useStyles } from "./ReturnPixDescription.style";
import { Box } from "@material-ui/core";
import { Alert } from "components/Alert";
import { Loader } from "components/Loader";
import { PixState } from "features/pix/redux/state";
import { AuthorizationSheet } from "components/AuthorizationSheet";
import { AccountRoutes } from "features/account/constants/routes";

interface ReturnPixDescriptionViewProps {
  onNextButtonClick: VoidFunction;
  onCancelButtonClick: VoidFunction;
  onDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEditTagsButtonClick: VoidFunction;
  onEditTagsClose: VoidFunction;
  onSubmit: (event: React.FormEvent) => void;
  description: string;
  openTagEditPopUp: boolean;
  loading: boolean;
  pixState: PixState;
  openAuthorizationSheet: boolean;
  onAuthorizationClose: any;
}

export const ReturnPixDescriptionView: React.FC<
  ReturnPixDescriptionViewProps
> = ({
  onCancelButtonClick,
  onDescriptionChange,
  onEditTagsButtonClick,
  description,
  onEditTagsClose,
  onSubmit,
  openTagEditPopUp,
  loading,
  pixState,
  openAuthorizationSheet,
  onAuthorizationClose,
}) => {
  const styles = useStyles();

  return (
    <PageContainer>
      <ProcessPageLayout
        {...(pixState.errorMessage && (
          <Alert
            title="Erro"
            message={pixState.errorMessage}
            severity={"error"}
          />
        ))}
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
          <ProcessDescriptionHeader
            title="Devolução de PIX"
            subtitle="Quer enviar uma mensagem?"
            description="Você pode inserir uma descrição ou mensagem para o recebedor."
          />
        }
        main={
          <React.Fragment>
            <Box component="form" onSubmit={onSubmit}>
              <TextField
                label="Descreva em uma frase"
                placeholder="Escreva sua frase"
                value={description}
                onChange={onDescriptionChange}
              />
              {/*               <div className={styles.titleAndDescriptionFilter}>
                  <ProcessDescriptionHeader
                    subtitle="Tags"
                    description="Insira marcações para identificar seus gastos. 
                               Use nossa sugestão ou personalize as tags."
                  />
                </div>
                <div className={styles.tagsFilterStyle}>
                  <TagChip
                    label="Crédito"
                    disabled={!pageTags.includes("Crédito")}
                    onClick={() => onTagClick("Crédito")}
                  />
                  <div className={styles.tagsFilterStyleChildren}>
                    <TagChip
                      label="Débito"
                      disabled={!pageTags.includes("Débito")}
                      onClick={() => onTagClick("Débito")}
                    />
                  </div>
                  <div className={styles.tagsFilterStyleChildren}>
                    <TagChip
                      label="Escola"
                      disabled={!pageTags.includes("Escola")}
                      onClick={() => onTagClick("Escola")}
                    />
                  </div>
                </div> */}
              <div className={styles.buttonTagFloating}>
                <ButtonWithFloatingIcon onClick={onEditTagsButtonClick}>
                  Editar TAG
                </ButtonWithFloatingIcon>
              </div>
              <TagEditPopUp
                open={openTagEditPopUp}
                onClose={onEditTagsClose}
                onSaveTags={() => {}}
              />
            </Box>
          </React.Fragment>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onSubmit}
              >
                {nextLabel}
              </Button>
            }
          />
        }
      />
      <AuthorizationSheet
        open={openAuthorizationSheet}
        onClose={onAuthorizationClose}
      />
      <Loader open={loading} />
    </PageContainer>
  );
};
