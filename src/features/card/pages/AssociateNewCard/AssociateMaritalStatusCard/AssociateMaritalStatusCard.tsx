import React from 'react'
import { AppBar } from 'components/AppBar'
import { PageContainer } from 'components/PageContainer'
import { AccountRoutes } from 'features/account/constants/routes'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { Button } from 'components/Button'
import { cancelLabel } from 'constants/buttons/labels'
import { useHistory } from 'react-router-dom'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@material-ui/core'
import { StoreState } from 'redux/state'
import { useStyles } from './SearchFilter.style'
import { CardRoutes } from 'features/card/constants/routes'
import { Card } from 'features/card/redux/models/card'
import { SearchFilter } from './SearchFilter'
import { updateCard } from 'features/card/redux/actions'

export const AssociateMaritalStatusCard: React.FC = () => {
  const [] = useSelector<
    StoreState,
    [Card | undefined, Card[] | undefined, boolean, string | undefined]
  >(state => [
    state.card.card,
    state.card.cards,
    state.card.loading,
    state.card.errorMessage,
  ])
  const [marital, setMarital] = React.useState<{
    maritalStatus: string
    maritalStatuss: string
  }>({
    maritalStatus: '',
    maritalStatuss: '',
  })
  const history = useHistory()
  const styles = useStyles()
  const dispatch = useDispatch()

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
    dispatch(updateCard())
  }
  const onNextButtonClick = () => {
    history.push(CardRoutes.associateNewCardCheck)
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
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={
          <ProcessDescriptionHeader
            title="Associar novo cartão"
            subtitle="Quase lá! Precisamos confirmar alguns dados pessoais"
            description="Qual seu estado civil?"
          />
        }
        main={
          <Box component="form">
            <SearchFilter
              marital={marital}
              setMarital={setMarital}
            ></SearchFilter>
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                onClick={onNextButtonClick}
                endIcon={<KeyboardArrowRight color="secondary" />}
                disabled={!marital.maritalStatus}
              >
                <span className={styles.nextButtonLabel}> Próximo </span>
              </Button>
            }
          />
        }
      />
    </PageContainer>
  )
}
