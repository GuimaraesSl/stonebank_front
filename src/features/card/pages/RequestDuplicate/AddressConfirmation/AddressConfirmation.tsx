import React from 'react'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import {
  Box,
  FormControlLabel,
  Radio,
  Typography,
  RadioGroup,
} from '@material-ui/core'
import { AppBar } from 'components/AppBar'
import { PageContainer } from 'components/PageContainer'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Button } from 'components/Button'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { useStyles } from './AddressConfirmation.style'
import { useHistory } from 'react-router'
import { AccountRoutes } from 'features/account/constants/routes'
import { CardRoutes } from 'features/card/constants/routes'
import { StoreState } from 'redux/state'
import { useSelector } from 'react-redux'

export const AddressConfirmation: React.FC = () => {
  const history = useHistory()
  const styles = useStyles()
  const { user } = useSelector((store: StoreState) => store.auth)
  const address = `${user?.street ?? ''}, nª ${user?.number ?? ''} - ${user?.district ?? ''}`
  const city = `${user?.city ?? ''}-${user?.state ?? ''}`
  const [value, setValue] = React.useState('yes')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }
  const onNextButtonClick = () => {
    value === 'yes'
      ? history.push(CardRoutes.reissueDetails)
      : history.push(CardRoutes.updateAddress)
  }
  const onCancelButtonClick = () => {
    history.push(CardRoutes.cardOption)
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
            title="Segunda via do cartão"
            subtitle="Confirme o endereço"
            description="Verifique se o endereço para envio do cartão está correto."
          />
        }
        main={
          <Box className={styles.container} data-test-id="address-confirmation">
            <Typography className={styles.addressDescription}>
              {address}
              <br />
              {city}
            </Typography>
            <Typography className={styles.questionIsCorrect}>
              {'Endereço está correto?'}
            </Typography>
            <RadioGroup
              className={styles.radioGroup}
              value={value}
              onChange={handleChange}
              data-test-id="radio-group"
            >
              <FormControlLabel
                className={styles.formLabel}
                value="yes"
                control={<Radio className={styles.radio} />}
                label="Sim"
                labelPlacement="start"
                data-test-id="form-label-no"
              />
              <FormControlLabel
                className={styles.formLabel}
                value="no"
                control={<Radio className={styles.radio} />}
                label="Não"
                labelPlacement="start"
                data-test-id="form-label-yes"
              />
            </RadioGroup>
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                palette="primary"
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onNextButtonClick}
                data-test-id="next-button"
              >
                {nextLabel}
              </Button>
            }
          />
        }
      />
    </PageContainer>
  )
}
