import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import { CurrencyFormatter } from "_translate";
import { ProcessPageFooter } from "components/ProcessPageFooter";
import { ProcessPageLayout } from "components/ProcessPageLayout";
import { ListButtonRadio } from "features/topUp/components/ListButton/ListButtonRadio";
import { useStyles } from "./TopUpValue.style";
import { TopUpRoutes } from "features/topUp/constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "redux/state";
import { closeAlert, updateTopUpData } from "features/topUp/redux/actions";
import { Alert } from "components/Alert";
import { Loader } from "components/Loader";
import { TopUpProduct } from "features/topUp/redux/models/topUpProduct";

export const TopUpValue: React.FC = () => {
  const history = useHistory();
  const styles = useStyles();
  const dispatch = useDispatch();
  const topUpState = useSelector((store: StoreState) => store.topUp);

  // const { description } = useSelector(
  //   (store: StoreState) => store.topUp.topUp!.topUpProduct,
  // )

  const { loading, topUpPhoneNumberList, errorMessage } = topUpState;
  const onProductClick = (product: TopUpProduct) => {
    dispatch(
      updateTopUpData({
        topUpProduct: product,
      })
    );
    history.push(TopUpRoutes.checkDataTopUp);
  };
  const onAlertClose = () => {
    dispatch(closeAlert());
  };

  return (
    <Box className={styles.contentPage}>
      <ProcessPageLayout
        header={
          <React.Fragment>
            {/* <img src={Tim} alt="Operator" /> */}
            {/* {description} */}
            <Typography variant="body1" className={styles.description}>
              Valor da recarga
            </Typography>
          </React.Fragment>
        }
        main={
          <Box data-test-id="top-up-value" className={styles.listOptions}>
            {topUpPhoneNumberList?.topUpPhoneNumberList?.map((product, i) => (
              <ListButtonRadio
                key={i}
                title={
                  CurrencyFormatter.format(product.productValue) +
                  "  " +
                  product.description
                }
                description=""
                onClick={() => {
                  onProductClick(product);
                }}
                goToRoute={TopUpRoutes.checkDataTopUp}
              ></ListButtonRadio>
            ))}
          </Box>
        }
        footer={<ProcessPageFooter />}
      />
      {errorMessage && (
        <Alert
          title="Erro"
          message={errorMessage}
          severity={"error"}
          onClose={onAlertClose}
        />
      )}
      <Loader open={loading} />
    </Box>
  );
};
