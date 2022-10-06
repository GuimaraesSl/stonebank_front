import React from 'react'
import { useHistory } from 'react-router-dom'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { cancelLabel, nextLabel, returnLabel } from 'constants/buttons/labels'
import { AuthenticationRoutes } from 'features/authentication/constants/routes'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { PasswordField } from 'components/PasswordField'
import { Container, Grid, Typography } from '@material-ui/core'
import { useStyles } from './ChangePasswordFirstAccess.style'
import { Validator } from 'components/Validator'
import {
  validateLowerUpperNumber,
  validateLength,
  validateSpecial,
} from "_utils/validate";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "features/authentication/redux/actions";
import { KeyboardArrowLeft } from "@material-ui/icons";
import { logout } from "features/authentication/redux/actions";
import { StoreState } from "redux/state";
import { Alert } from "components/Alert";

export const ChangePasswordFirstAccess: React.FC = () => {
  const [newPassword, setNewPassword] = React.useState("");
  const [disableNextButton, setDisableNextButton] = React.useState(false);
  const [passwordLengthIsValid, setPasswordLenghtIsValid] = React.useState<
    boolean | undefined
  >();
  const [passwordLowerIsValid, setPasswordLowerIsValid] = React.useState<
    boolean | undefined
  >();
  const [passwordUpperIsValid, setPasswordUpperIsValid] = React.useState<
    boolean | undefined
  >();
  const [passwordSpecialIsValid, setPasswordSpecialIsValid] = React.useState<
    boolean | undefined
  >();
  const [passwordValidateNumber, setPasswordValidateNUmber] = React.useState<
    boolean | undefined
  >();

  const dispatch = useDispatch();
  const history = useHistory();
  const styles = useStyles();

  const condition =
    passwordLengthIsValid &&
    passwordLowerIsValid &&
    passwordUpperIsValid &&
    passwordSpecialIsValid &&
    passwordValidateNumber;

  React.useEffect(() => {
    setDisableNextButton(!(condition && passwordLengthIsValid));
  }, [condition, passwordLengthIsValid]);

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewPassword(event.target.value);

  const onValidateLength = (value: boolean | undefined) => {
    setPasswordLenghtIsValid(value);
  };

  const onValidateLowerUpperNumber = (value: boolean | undefined) => {
    setPasswordLowerIsValid(value);
    setPasswordUpperIsValid(value);
    setPasswordValidateNUmber(value);
  };

  const onCancelButtonClick = () => {
    dispatch(logout());
    history.replace(AuthenticationRoutes.signIn);
  };

  const onNextButtonClick = (event: React.FormEvent) => {
    event.preventDefault();
    history.push(AuthenticationRoutes.confirmPasswordFirstAccess);
    dispatch(updatePassword({ newPassword }));
  };

  const authState = useSelector((state: StoreState) => state.auth);

  return (
    <Container maxWidth="xs" className={styles.container}>  

      <ProcessDescriptionHeader
        title={'Criar Senha'}
        description="Para utilizar  nossos serviços , você deve estar de acordo com os termos de uso"
      />
  
      <Grid
        container
        direction="column"
        spacing={3}
        onSubmit={onNextButtonClick}
      >
        {authState.errorMessage && (
          <Alert
            title="Erro"
            message={authState.errorMessage}
            severity={'error'}
          />
        )}

        <Grid item component="form" className={styles.input}>
          <PasswordField
            label="Nova Senha"
            value={newPassword}
            placeholder="Digite sua nova senha"
            onChange={onPasswordChange}
          />
        </Grid>

        <Grid item>
          <Typography
            className={styles.description}
            data-test-id="description-text"
          >
            Sua senha deve atender os critérios a baixo:
          </Typography>
        </Grid>

        <Grid item>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Validator
                value={newPassword}
                description={'Ao menos um caractere especial'}
                isValid={passwordSpecialIsValid}
                validation={validateSpecial}
                onValidate={setPasswordSpecialIsValid}
                strictValidation={false}
              />
            </Grid>
            <Grid item>
              <Validator
                value={newPassword}
                description={'No mínimo 8 caracteres e no máximo 16'}
                isValid={passwordLengthIsValid}
                validation={validateLength}
                onValidate={onValidateLength}
                strictValidation={false}
              />
            </Grid>
            <Grid item>
              <Validator
                value={newPassword}
                description={'Letras maiúsculas, minúsculas e números'}
                isValid={
                  passwordUpperIsValid &&
                  passwordLowerIsValid &&
                  passwordValidateNumber
                }
                validation={() => validateLowerUpperNumber(newPassword)}
                onValidate={onValidateLowerUpperNumber}
                strictValidation={false}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
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
            onClick={onCancelButtonClick}
            data-test-id="cancel-button"
          >
            {returnLabel}
          </Button>
        }
      />
    </Container>
  )
}
