import React from "react";
import { Box } from "@material-ui/core";
import { AppBar } from "components/AppBar";
import { ProcessPageLayout } from "components/ProcessPageLayout";
import { ProcessPageFooter } from "components/ProcessPageFooter";
import { ProcessDescriptionHeader } from "components/ProcessDescriptionHeader";
import { TermsText } from "features/onboarding/components/texts/TermsText";
import { OnboardingRoutes } from "features/onboarding/constants/routes";
import { Button } from "components/Button";
import { nextLabel, returnLabel } from "constants/buttons/labels";
import { KeyboardArrowRight } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { ConfigContext } from "_config";
import { useStyles } from "./Terms.style";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "redux/state";
import { AuthenticationRoutes } from "features/authentication/constants/routes";
import {
  updateUserTerms,
  logout as signOut,
} from "features/authentication/redux/actions";
import { AccountRoutes } from "features/account/constants/routes";
import { KeyboardArrowLeft } from "@material-ui/icons";
import { Loader } from "components/Loader";
import {
  UpdateTermsSuccessState,
  UpdateTermsLoadingState,
} from "features/authentication/redux/state";
import { closeAlert } from "features/card/redux/actions";
import { Alert } from "components/Alert";

export const Terms: React.FC = () => {
  const [actTerms, setActTerms] = React.useState(false);
  const [disableNextButton, setDisableNextButton] = React.useState(false);
  const { company } = React.useContext(ConfigContext);
  const history = useHistory();
  const styles = useStyles();
  const dispatch = useDispatch();
  //Testando GitHub Actions

  const { acceptedTerms, FirstAccess, login, authState } = useSelector(
    (store: StoreState) => ({
      acceptedTerms: store.auth.user?.acceptedTerms,
      FirstAccess: store.auth.user?.isFirstAccess,
      login: store.auth.user?.taxId,
      authState: store.auth,
    })
  );

  React.useEffect(() => {
    setDisableNextButton(!actTerms);
  }, [actTerms]);

  const onBackToLogin = () => {
    dispatch(signOut());
    history.replace(AuthenticationRoutes.signIn);
  };

  const handleTermsAccept = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActTerms(event.target.checked);
  };

  const onAlertClose = () => {
    dispatch(closeAlert());
  };

  const onNextButtonClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login) history.push(OnboardingRoutes.activateAccount);
    else if (FirstAccess && !acceptedTerms) dispatch(updateUserTerms(login!));
    else if (!acceptedTerms) dispatch(updateUserTerms(login!));
  };

  React.useEffect(() => {
    if (authState instanceof UpdateTermsSuccessState) {
      if (FirstAccess && !acceptedTerms)
        history.replace(AuthenticationRoutes.temporaryPassword);
      else if (!acceptedTerms) history.replace(AccountRoutes.home);
    }
  }, [authState, FirstAccess, history, acceptedTerms]);

  return (
    <React.Fragment>
      <Loader open={authState instanceof UpdateTermsLoadingState} />
      {authState.errorMessage && (
        <Alert
          title="Erro"
          message={authState.errorMessage}
          severity={"error"}
          onClose={onAlertClose}
        />
      )}
      <ProcessPageLayout
        appBar={<AppBar homeRoute={OnboardingRoutes.terms} />}
        header={
          <ProcessDescriptionHeader
            title={`Bem vindo ao ${company.name}`}
            subtitle="TERMO DE ADESÃO AOS TERMOS E CONDIÇÕES DE USO"
            description="Para usar nossos serviços, você deve estar de acordo com os termos de uso"
          />
        }
        main={
          <Box className={styles.termsWrapper}>
            <TermsText
              valueCheckBox={actTerms}
              termsAcceptCheckBox={handleTermsAccept}
            />
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                disabled={disableNextButton}
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onNextButtonClick}
                data-test-id="next-button"
              >
                {nextLabel}
              </Button>
            }
            secondaryButton={
              <Button
                palette="secondary"
                startIcon={<KeyboardArrowLeft color="secondary" />}
                onClick={onBackToLogin}
                data-test-id="cancel-button"
              >
                {returnLabel}
              </Button>
            }
          />
        }
        footerPosition="fixed"
      />
    </React.Fragment>
  );
};
