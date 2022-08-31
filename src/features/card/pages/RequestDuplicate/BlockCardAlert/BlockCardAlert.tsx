import React from 'react'
import { useStyles } from './BlockCardAlert.style'
import { PageContainer } from 'components/PageContainer'
import { useHistory } from 'react-router-dom'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { CardRoutes } from 'features/card/constants/routes'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { Typography, Box } from '@material-ui/core'
import { AccountRoutes } from 'features/account/constants/routes'
import { useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { Card } from 'features/card/redux/models/card'
import { UserRoutes } from 'features/user/constants/routes'
import { Icon } from 'components/Icon'

export const BlockCardAlert: React.FC = () => {
  const styles = useStyles()
  const history = useHistory()
  const [card] = useSelector<StoreState, [Card | undefined]>(state => [
    state.card.card,
  ])
  const { user } = useSelector((store: StoreState) => store.auth)
  const hasAddress =
    user?.street &&
    user?.number &&
    user?.zipCode &&
    user?.district &&
    user?.complement &&
    user?.city &&
    user?.state &&
    user?.country

  const onCancelButtonClick = () => {
    history.replace(CardRoutes.cardOption)
  }

  const onNextButtonClick = () => {
    hasAddress
      ? history.push(CardRoutes.address)
      : history.push(UserRoutes.changeAddress)
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
          <React.Fragment>
            <Box className={styles.description}>
              <ProcessDescriptionHeader title="Segunda via do cartão" />
            </Box>
            <Box className={styles.imageReference}>
              <Box className={styles.image}>
                <Icon name="alert" />
              </Box>
            </Box>
          </React.Fragment>
        }
        main={
          <React.Fragment>
            <Typography className={styles.attention}>ATENÇÃO!</Typography>
            <Typography className={styles.cardtext} data-test-id="card-text-1">
              <p>
                O cartão <strong>ELO - Final {card?.panLastDigits}</strong>
                <span className={styles.spanBreakLine}>
                  será <strong>cancelado</strong> definitivamente e um novo
                </span>{' '}
                cartão será enviado.
              </p>
            </Typography>
            <Typography className={styles.cardtext2} data-test-id="card-text-2">
              <p>
                Essa ação não poderá ser desfeita,{' '}
                <strong>
                  certifique-se
                  <span className={styles.spanBreakLine}>
                    que deseja continuar.
                  </span>
                </strong>
              </p>
            </Typography>
          </React.Fragment>
        }
        footer={
          <React.Fragment>
            <ProcessPageFooter
              primaryButton={
                <Button
                  endIcon={<KeyboardArrowRight color="secondary" />}
                  onClick={onNextButtonClick}
                  data-test-id="next-button"
                >
                  {nextLabel}
                </Button>
              }
            />
          </React.Fragment>
        }
      />
    </PageContainer>
  )
}
