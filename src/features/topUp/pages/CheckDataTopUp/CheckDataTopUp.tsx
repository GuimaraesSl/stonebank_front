import React from "react";
import { PageContainer } from "components/PageContainer";
import { ProcessPageLayout } from "components/ProcessPageLayout";
import { AppBar } from "components/AppBar";
import { AccountRoutes } from "features/account/constants/routes";
import { ProcessDescriptionHeader } from "components/ProcessDescriptionHeader";
import { useStyles } from "./CheckDataTopUp.style";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { ContentBalance } from "features/topUp/components/ContentBalance";
import { ProcessPageFooter } from "components/ProcessPageFooter";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { nextLabel } from "constants/buttons/labels";
import { Button } from "components/Button";
import { TopUpRoutes } from "features/topUp/constants/routes";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "redux/state";
import { updateTopUpData } from "features/topUp/redux/actions";
import { CurrencyFormatter } from "_translate";
import { ErrorMessage } from "components/ErrorMessage";

export const CheckDataTopUp: React.FC = () => {
  const style = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const topUpState = useSelector((store: StoreState) => store.topUp);
  const balance: number = useSelector(
    (store: StoreState) => store.account.dashboard?.balance!
  );

  const { topUpPhoneNumberList, topUp } = topUpState;
  const product =
    topUp?.topUpProduct ?? topUpPhoneNumberList?.topUpPhoneNumberList[0];

  const [isValidValue, setIsValidValue] = React.useState(false);
  const [balanceIsValid, setBalanceIsValid] = React.useState<
    boolean | undefined
  >();
  React.useEffect(() => {
    dispatch(
      updateTopUpData({
        originNSU: topUpPhoneNumberList?.originNSU,
        topUpProduct: product,
      })
    );
  }, []);

  React.useEffect(() => {
    const convertedValue = product?.productValue!;
    setIsValidValue(convertedValue > 0 && convertedValue <= balance);
    setBalanceIsValid(convertedValue <= balance);
  }, [product]);

  const onNextButtonClick = () => history.push(TopUpRoutes.topUpSchedule);
  const onListCharge = () => history.push(TopUpRoutes.topUpValue);
  const onBack = () => {
    history.push(TopUpRoutes.topUp);
  };

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={<AppBar homeRoute={AccountRoutes.home} />}
        header={
          <Box className={style.headerContent}>
            <ProcessDescriptionHeader
              title="Recargas"
              subtitle="Celular pré-pago"
              description={`Recarregar o número ${topUp?.phoneNumber}`}
            />
          </Box>
        }
        main={
          <React.Fragment>
            <Box>
              <Box className={style.viewBalance} data-test-id="view-balance">
                <ContentBalance balance={CurrencyFormatter.format(balance)} />
              </Box>
              <Box className={style.operatorView} data-test-id="operator-view">
                <Typography className={style.txtOperator}>
                  {/* Sua operadora */}
                </Typography>
                {/* <img
              src={TimIcon}
              alt="Icone Tim"
              className={style.iconOperator}
            /> */}
                {/* <strong>{product?.description}</strong> */}
              </Box>
              <List className={style.list} disablePadding>
                <Box onClick={onListCharge}>
                  <ListItem button className={style.listItem}>
                    <ListItemText
                      primary={
                        <Box>
                          <Box className={style.spantext}>Qual o valor?</Box>
                          <Typography className={style.valueTopUp}>
                            {CurrencyFormatter.format(product?.productValue!) +
                              " " +
                              product?.description}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography className={style.validateTopUp}>
                            Válido por 30 dias
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction className={style.selectValue}>
                      <Box>
                        Selecionar
                        <Box className={style.blocktext}>valor</Box>
                      </Box>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Box>
              </List>
            </Box>
            <Box className={style.validator}>
              {!balanceIsValid && (
                <ErrorMessage message={"Saldo insuficiente"} />
              )}
            </Box>
          </React.Fragment>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onNextButtonClick}
                disabled={!isValidValue}
                data-test-id="next-button"
              >
                {nextLabel}
              </Button>
            }
            secondaryButton={
              <Button
                palette="secondary"
                startIcon={<KeyboardArrowLeft color="secondary" />}
                onClick={onBack}
              >
                Voltar
              </Button>
            }
          />
        }
      />
    </PageContainer>
  );
};
