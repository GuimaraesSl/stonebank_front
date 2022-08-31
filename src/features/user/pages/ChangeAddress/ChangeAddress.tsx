import React from 'react'
import { PageContainer } from 'components/PageContainer'
import { AppBar } from 'components/AppBar'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import '_assets/css/forms/mainform.scss'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { Grid } from '@material-ui/core'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { TextField } from 'components/TextField'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { AccountRoutes } from 'features/account/constants/routes'
import { maskZipCode } from '_utils/masks/zipCode'
import { useMask } from 'hooks/useMask'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { updateUserInformation } from 'features/user/redux/actions'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { closeAlert } from 'features/account/redux/actions'
import { numericOnly } from '_utils/masks/generics'
import { UserRoutes } from 'features/user/constants/routes'
import { SuccessUpdateUserInformationState } from 'features/user/redux/state'
import { updateAuthData } from 'features/authentication/redux/actions'

export const ChangeAddress: React.FC = () => {
  const [district, setDistrictInput] = React.useState('')
  const [streetName, setStreetNameInput] = React.useState('')
  const [complementName, setComplementNameInput] = React.useState('')
  const [noStreetNumber, setNoStreetNumber] = React.useState(false)
  const [city, setCity] = React.useState('')
  const [state, setState] = React.useState('')
  const [referenceName, setReferenceNameInput] = React.useState('')
  const [countryName, setCountryNameInput] = React.useState('')

  const [disableNextButton, setDisableNextButton] = React.useState(false)
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)
  const [streetNumber, setStreetNumberInput] = useMask(numericOnly)
  const [zipCode, setZipCodeInput] = useMask(maskZipCode)
  const [validatedToken, setValidatedToken] = React.useState(false)

  const { user } = useSelector((store: StoreState) => store.auth)

  const userInformationState = useSelector(
    (store: StoreState) => store.userInformation,
  )

  const { loading, errorMessage } = userInformationState

  const history = useHistory()

  const dispatch = useDispatch()

  React.useEffect(() => {
    const condition =
      zipCode &&
      streetName &&
      streetNumber &&
      district &&
      complementName &&
      city &&
      state &&
      countryName
    if (condition) {
      setDisableNextButton(false)
    } else setDisableNextButton(true)
  }, [
    district,
    streetName,
    streetNumber,
    zipCode,
    complementName,
    city,
    state,
    referenceName,
    countryName,
  ])

  React.useEffect(() => {
    if (
      validatedToken &&
      userInformationState instanceof SuccessUpdateUserInformationState
    ) {
      history.push(UserRoutes.changeConclude)
      dispatch(
        updateAuthData({
          ...user,
          zipCode: zipCode,
          street: streetName,
          number: streetNumber,
          district: district,
          complement: complementName,
          city: city,
          state: state,
          reference: referenceName,
          country: countryName,
        }),
      )
    }
  }, [
    complementName,
    dispatch,
    district,
    history,
    streetName,
    streetNumber,
    user,
    userInformationState,
    validatedToken,
    zipCode,
    city,
    state,
    referenceName,
    countryName,
  ])

  const onZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setZipCodeInput(event.target.value)

  const onStreetNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setStreetNameInput(event.target.value)

  const onStreetNumberChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setStreetNumberInput(event.target.value)

  const onComplementNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setComplementNameInput(event.target.value)

  const onDistrictChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDistrictInput(event.target.value)

  const onCityChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCity(event.target.value)

  const onStateChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setState(event.target.value)

  const onReferenceNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setReferenceNameInput(event.target.value)

  const onCountryNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCountryNameInput(event.target.value)

  const onCancelButtonClick = () => {
    history.go(-2)
  }

  const onNextButtonClick = () => {
    setOpenAuthorizationSheet(true)
  }

  const onAlertClose = () => {
    dispatch(closeAlert())
  }

  const onAuthorizationSheetClose = (isTokenValid: boolean) => {
    if (isTokenValid) {
      setValidatedToken(true)

      dispatch(
        updateUserInformation({
          zipCode: zipCode,
          street: streetName,
          number: streetNumber,
          district: district,
          complement: complementName,
          city: city,
          state: state,
          reference: referenceName,
          country: countryName,
        }),
      )
    }

    setOpenAuthorizationSheet(false)
  }

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
            title="Endereço"
            description="Confirme seu endereço de correspondência"
          />
        }
        main={
          <Grid container direction="column" spacing={2} >
            <Grid item>
              <TextField
                label="CEP"
                inputMode="numeric"
                value={zipCode}
                required
                onChange={onZipCodeChange}
                data-test-id="change-zip-code"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Logradouro"
                value={streetName}
                required
                onChange={onStreetNameChange}
                data-test-id="change-street-name"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Número"
                type="number"
                inputMode="numeric"
                value={streetNumber}
                required
                onChange={onStreetNumberChange}
                data-test-id="change-street-number"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Bairro"
                value={district}
                required
                onChange={onDistrictChange}
                data-test-id="change-street-district"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Complemento"
                value={complementName}
                required
                onChange={onComplementNameChange}
                data-test-id="change-complement"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Referência"
                value={referenceName}
                onChange={onReferenceNameChange}
                data-test-id="change-street-reference"
              />
            </Grid>
            <Grid item>
              <TextField
                label="País"
                value={countryName}
                required
                onChange={onCountryNameChange}
                data-test-id="change-street-country"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Cidade"
                value={city}
                required
                onChange={onCityChange}
                data-test-id="change-city"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Estado"
                value={state}
                required
                onChange={onStateChange}
                data-test-id="change-state"
              />
            </Grid>
          </Grid>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                palette="primary"
                endIcon={<KeyboardArrowRight color="secondary" />}
                disabled={disableNextButton}
                onClick={onNextButtonClick}
                data-test-id="next-button"
              >
                {nextLabel}
              </Button>
            }
          />
        }
      />
      <AuthorizationSheet
        open={openAuthorizationSheet}
        description="Para autenticar a operação"
        onClose={onAuthorizationSheetClose}
      />
      {errorMessage && (
        <Alert
          title="Erro"
          message={errorMessage}
          severity={'error'}
          onClose={onAlertClose}
        />
      )}
      <Loader open={loading} />
    </PageContainer>
  )
}
