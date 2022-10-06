import React from "react";
import { AppBar } from "components/AppBar";
import { ProcessDescriptionHeader } from "components/ProcessDescriptionHeader";
import { TaxPaymentRoutes } from "../../../constants/routes";
import { ProcessPageLayout } from "components/ProcessPageLayout";
import { Button } from "components/Button";
import { Close, KeyboardArrowRight } from "@material-ui/icons";
import { cancelLabel, nextLabel } from "constants/buttons/labels";
import { ProcessPageFooter } from "components/ProcessPageFooter";
import { PageContainer } from "components/PageContainer";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "redux/state";
import { useHistory } from "react-router-dom";
import { TextField } from "components/TextField";

import { ButtonWithFloatingIcon } from "components/ButtonWithFloatingIcon/ButtonWithFloatingIcon";
import { TagEditPopUp } from "components/TagEditPopUp";

import { useStyles } from "./PaymentGareDescription.style";
import { Box, Grid } from "@material-ui/core";
import { Loader } from "components/Loader";
import { AccountRoutes } from "features/account/constants/routes";
import { updateGarePaymentData } from "features/taxPayment/redux/actions";
import { TagChip } from "features/tags/components/TagChip";

export const PaymentGareDescription: React.FC = () => {
  const [description, setDescription] = React.useState("");

  const loading = useSelector((state: StoreState) => state.tags.loading);
  const pageTags = useSelector(
    (state: StoreState) => state.taxPayment.gare?.tags
  );

  const [openTagEditPopUp, setOpenTagEditPopUp] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const styles = useStyles();

  const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(event.target.value);

  const onEditTagsButtonClick = () => {
    setOpenTagEditPopUp(true);
  };

  const onEditTagsClose = () => {
    setOpenTagEditPopUp(false);
  };

  const onCancelButtonClick = () => {
    dispatch(updateGarePaymentData());
    history.replace(AccountRoutes.home);
  };

  const onTagClick = (tag: string) => {
    dispatch(
      updateGarePaymentData({ tags: pageTags!.filter((t) => t !== tag) })
    );
  };
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    history.push(TaxPaymentRoutes.paymentGareSummary);

    dispatch(
      updateGarePaymentData({
        description: description,
      })
    );
    history.push(TaxPaymentRoutes.paymentGareSummary);
  };

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={
          <AppBar
            homeRoute={TaxPaymentRoutes.paymentGare}
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
            title="Pagamento"
            subtitle="Deseja identificar seu pagamento no extrato?"
            description="Adicione uma descrição para identificar melhor esse pagamento em seu histórico."
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
                data-test-id="description-change"
              />
              <Box className={styles.titleAndDescriptionFilter}>
                <ProcessDescriptionHeader
                  subtitle="Tags"
                  description="Insira marcações para identificar seus gastos. 
                             Use nossa sugestão ou personalize as tags."
                />
              </Box>
              <Grid container spacing={1}>
                {pageTags?.map((tag) => (
                  <Grid item key={tag}>
                    <TagChip label={tag} onClick={onTagClick} />
                  </Grid>
                ))}
              </Grid>

              <Grid className={styles.buttonTagFloating}>
                <ButtonWithFloatingIcon
                  onClick={onEditTagsButtonClick}
                  data-test-id="edit-button"
                >
                  Editar TAG
                </ButtonWithFloatingIcon>

                <TagEditPopUp
                  onSaveTags={(tags) =>
                    dispatch(updateGarePaymentData({ tags }))
                  }
                  open={openTagEditPopUp}
                  onClose={onEditTagsClose}
                />
              </Grid>
            </Box>
          </React.Fragment>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
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
      <Loader open={loading} />
    </PageContainer>
  );
};
