import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "redux/state";
import { useHistory } from "react-router-dom";
import { ProcessPageLayout } from "components/ProcessPageLayout";
import { AppBar } from "components/AppBar";
import { Button } from "components/Button";
import { cancelLabel, nextLabel, skipLabel } from "constants/buttons/labels";
import { ProcessDescriptionHeader } from "components/ProcessDescriptionHeader";
import { Close, KeyboardArrowRight } from "@material-ui/icons";
import { Box, Grid } from "@material-ui/core";
import { ProcessPageFooter } from "components/ProcessPageFooter";
import { TextField } from "components/TextField";
import { useStyles } from "./PaymentDescription.style";
import { updatePaymentData } from "features/payment/redux/actions";
import { useDispatch } from "react-redux";
import { PaymentRoutes } from "features/payment/constants/routes";
import { AccountRoutes } from "features/account/constants/routes";
import { PageContainer } from "components/PageContainer";
import { Loader } from "components/Loader";
import { TagChip } from "features/tags/components/TagChip";
import { ButtonWithFloatingIcon } from "components/ButtonWithFloatingIcon";
import { TagEditPopUp } from "components/TagEditPopUp";

export const PaymentDescription: React.FC = () => {
  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [openTagEditPopUp, setOpenTagEditPopUp] = React.useState(false);
  const [inputText, setInputText] = React.useState("");

  const [originalPaymentValue, payementTags] = useSelector<
    StoreState,
    [number, string[] | undefined]
  >((state) => [
    state.payment.paymentData?.originalPaymentValue!,
    state.payment.paymentData?.tags,
  ]);
  const loading = useSelector((state: StoreState) => state.tags.loading);

  const payment = useSelector((store: StoreState) => store.payment);
  const { paymentData } = payment;

  const onCancelButtonClick = () => dispatch(updatePaymentData());

  const onSkipLabelButtonClick = async (description: string) => {
    dispatch(updatePaymentData({ description: description }));
    history.push(PaymentRoutes.summary);
  };

  const handleChange = (event: any) => {
    setInputText(event.target.value);
  };

  const onBackButtonClick = () => {
    dispatch(updatePaymentData({ paymentValue: paymentData?.paymentValue }));
  };

  const onEditTagsButtonClick = () => {
    setOpenTagEditPopUp(true);
  };

  const onEditTagsClose = () => {
    setOpenTagEditPopUp(false);
  };

  const onTagClick = (tag: string) => {
    dispatch(
      updatePaymentData({ tags: payementTags!.filter((t) => t !== tag) })
    );
  };

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={
          <AppBar
            homeRoute={"/"}
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
            title="Pagamentos"
            subtitle="Deseja identificar seu pagamento no extrato?"
            description="Adicione uma descrição, arquivo, foto ou mesmo um vídeo para identificar melhor essa transação em seu histórico."
          />
        }
        main={
          <Box className={styles.customBody}>
            <Box className={styles.customInput}>
              <TextField
                label="Descreva em uma frase"
                placeholder="Escreva sua frase"
                value={inputText}
                onChange={handleChange}
                data-test-id="inpu-text"
              />
            </Box>
            <Box className={styles.titleAndDescriptionFilter}>
              <ProcessDescriptionHeader
                subtitle="Tags"
                description="Caso queira, insira marcações para identificar seus gastos."
              />
            </Box>

            <Box marginTop={1}>
              <Grid container spacing={1}>
                {payementTags?.map((tag) => (
                  <Grid item key={tag}>
                    <TagChip label={tag} onClick={onTagClick} />
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box className={styles.buttonTagFloating}>
              <ButtonWithFloatingIcon
                onClick={onEditTagsButtonClick}
                data-test-id="edit-button"
              >
                Editar TAG
              </ButtonWithFloatingIcon>
            </Box>
            <TagEditPopUp
              onSaveTags={(tags) => dispatch(updatePaymentData({ tags }))}
              open={openTagEditPopUp}
              onClose={onEditTagsClose}
            />
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={() => onSkipLabelButtonClick(inputText)}
                data-test-id="skip-label-button"
              >
                {!inputText && !payementTags ? skipLabel : nextLabel}
              </Button>
            }
            onBackButtonClick={onBackButtonClick}
            data-test-id="back-button"
          />
        }
      />
      <Loader open={loading} />
    </PageContainer>
  );
};
