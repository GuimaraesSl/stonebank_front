/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Box } from "@material-ui/core";
import { Alert } from "components/Alert";
import { Loader } from "components/Loader";
import { PageContainer } from "components/PageContainer";
import { HomePageHeader } from "features/account/components/HomePageHeader";
import { AccountSheet } from "features/account/components/AccountSheet/AccountSheet";
import { FeaturesList } from "features/account/components/FeaturesList";
import { ButtonWithFloatingIcon } from "components/ButtonWithFloatingIcon";
import { Account } from "features/account/redux/models/account";
import { useStyles } from "./Home.style";
import { Icon } from "components/Icon";

interface HomeProps {
  account?: Account;
  errorMessage?: string;
  loading: boolean;
  showAccountSheet: boolean;
  onAlertClose: VoidFunction;
  toggleAccountSheet: VoidFunction;
}

export const HomeView: React.FC<HomeProps> = ({
  account,
  errorMessage,
  loading,
  showAccountSheet,
  onAlertClose,
  toggleAccountSheet,
}) => {
  const styles = useStyles();

  return (
    <PageContainer className={styles.pageContainer}>
      <HomePageHeader className={styles.header} />
      <Box component="main">
        <FeaturesList className={styles.buttonsRow} />
      </Box>
      <Loader open={loading} />
      <Box className={styles.formFooterHome}>
        <React.Fragment>
          <ButtonWithFloatingIcon
            icon={<Icon name="swap" />}
            onClick={toggleAccountSheet}
            data-test-id="change-account-button"
          >
            Trocar conta
          </ButtonWithFloatingIcon>
          {showAccountSheet && (
            <AccountSheet
              account={account}
              open={showAccountSheet}
              onClose={toggleAccountSheet}
            />
          )}
        </React.Fragment>
      </Box>

      {errorMessage && (
        <Alert
          title="Erro"
          message={errorMessage}
          severity={"error"}
          onClose={onAlertClose}
        />
      )}
    </PageContainer>
  );
};
