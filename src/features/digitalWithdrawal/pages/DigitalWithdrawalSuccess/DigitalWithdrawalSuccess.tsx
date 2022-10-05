import React from "react";
import { Box } from "@material-ui/core";
import { AppBar } from "components/AppBar";
import { useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { PageContainer } from "components/PageContainer";
import { ProcessPageLayout } from "components/ProcessPageLayout";
import { homeLabel, receiptLabel } from "constants/buttons/labels";
import { useStyles } from "./DigitalWithdrawalSuccess.style";
import { ButtonWithFloatingIcon } from "components/ButtonWithFloatingIcon";
import { DigitalWithdrawalRoutes } from "features/digitalWithdrawal/constants/routes";
import { AccountRoutes } from "features/account/constants/routes";
import { Icon } from "components/Icon";

export const DigitalWithdrawalSuccess: React.FC = () => {
  const history = useHistory();
  const styles = useStyles();

  const onReceiptButtonClick = () => {
    history.push(DigitalWithdrawalRoutes.digitalWithdrawReceipt);
  };

  const onHomeButtonClick = () => {
    history.push(AccountRoutes.home);
  };

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={<AppBar homeRoute="/" />}
        main={
          <Box className={styles.content}>
            <Typography className={styles.title}>Saque </Typography>
            <Typography className={styles.title}>concluído </Typography>
            <Icon name={"concludedImage"} className={styles.img} />
          </Box>
        }
        footer={
          <Box className={styles.footer}>
            <ButtonWithFloatingIcon
              icon={<Icon name="receipt" />}
              size="large"
              onClick={onReceiptButtonClick}
            >
              {receiptLabel}
            </ButtonWithFloatingIcon>
            <ButtonWithFloatingIcon
              icon={<Icon name="home" />}
              size="large"
              onClick={onHomeButtonClick}
            >
              {homeLabel}
            </ButtonWithFloatingIcon>
          </Box>
        }
      />
    </PageContainer>
  );
};
