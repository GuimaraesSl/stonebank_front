import React, { useState } from 'react'
import { Box } from '@material-ui/core'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AppBar } from 'components/AppBar'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { SelectCardButton } from 'features/card/components/SelectCardButton'
import { AccountRoutes } from 'features/account/constants/routes'
import { CardRoutes } from 'features/card/constants/routes'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from 'features/card/redux/models/card'
import { StoreState } from 'redux/state'
import {
  findCardList,
  selectCard,
  updateCard,
} from 'features/card/redux/actions'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { KeyboardArrowLeft } from '@material-ui/icons'
import { Button } from 'components/Button'
import { EmptyList } from 'components/EmptyList'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon'
import { useStyles } from './CardManagement.style'
import { Icon } from 'components/Icon'

export const CardManagement: React.FC = () => {
  const [cards, loading, errorMessage] = useSelector<
    StoreState,
    [Card[] | undefined, boolean, string | undefined]
  >(state => [state.card.cards, state.card.loading, state.card.errorMessage])

  const cardState = useSelector((state: StoreState) => state.card)

  const history = useHistory()
  const dispatch = useDispatch()
  const styles = useStyles()

  const [displayCards, setDisplayCards] = React.useState(cards)

  const onAssociateButton = () => history.push(CardRoutes.associateNewCard)

  const onSettings = () => history.push(AccountRoutes.settings)

  const onBackButtonClick = () => {
    history.replace(AccountRoutes.home)
    dispatch(updateCard())
  }

  const onNextPageCard = (card: Card) => {
    dispatch(selectCard(card))

    if (card.status === 2) history.push(CardRoutes.activateCard)
    else history.push(CardRoutes.cardOption)
  }

  const imageFlagCard = (flag: string) => {
    switch (flag) {
      case 'ELO':
        return <Icon name="eloImage" />

      case 'VISA':
        return <Icon name="visaImage" />

      case 'MasterCard':
        return <Icon name="visaImage" />
    }
  }

  React.useEffect(() => {
    dispatch(updateCard(cardState.card))
  }, [])

  React.useEffect(() => {
    dispatch(findCardList())
  }, [])

  React.useEffect(() => {
    setDisplayCards(cards)
  }, [cards])

  const isEmptyList = () => {
    return !displayCards?.length!
  }

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={<AppBar homeRoute={AccountRoutes.home} />}
        header={
          <ProcessDescriptionHeader
            title="Gerenciamento de Cartões"
            subtitle="Aqui estão os cartões associados à sua conta"
            description="Selecione o cartão que deseja gerenciar"
          />
        }
        main={
          <Box display="flex" flexDirection="column">
            {isEmptyList() ? (
              <EmptyList />
            ) : (
              <Box>
                {displayCards?.map(cards => (
                  <SelectCardButton
                    key={cards.identifierCard}
                    card={cards}
                    flagtype="ELO"
                    flagCard={imageFlagCard('ELO')}
                    onClick={() => onNextPageCard(cards)}
                  />
                ))}
              </Box>
            )}

            {/* <Box className={styles.associateCard}>
              <ButtonWithFloatingIcon
                icon={iconAssociate}
                onClick={onAssociateButton}
              >
                Associar cartão
              </ButtonWithFloatingIcon>
            </Box> */}
          </Box>
        }
        footer={
          <React.Fragment>
            <Box className={styles.associateCard}>
              <ButtonWithFloatingIcon
                icon={<Icon name={'iconAssociateCard'} />}
                onClick={onAssociateButton}
                data-test-id="associate-card-button"
              >
                Associar cartão
              </ButtonWithFloatingIcon>
            </Box>
            <ProcessPageFooter
              secondaryButton={
                <Button
                  palette="secondary"
                  startIcon={<KeyboardArrowLeft color="secondary" />}
                  onClick={onBackButtonClick}
                >
                  Voltar
                </Button>
              }
            />
          </React.Fragment>
        }
        footerPosition="fixed"
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert title="Erro" message={errorMessage} severity="error" />
      )}
    </PageContainer>
  )
}
