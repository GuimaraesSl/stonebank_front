import React from 'react'
import { AppBar } from 'components/AppBar'
import { PageContainer } from 'components/PageContainer'
import { AccountRoutes } from 'features/account/constants/routes'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { Button } from 'components/Button'
import { cancelLabel } from 'constants/buttons/labels'
import { nextLabel } from 'constants/buttons/labels'
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

export const AssociateGenderUserCard: React.FC = () => {
  const [] = useSelector<
    StoreState,
    [Card | undefined, boolean, string | undefined]
  >(state => [state.card.card, state.card.loading, state.card.errorMessage])
  const [gender, setGender] = React.useState<{
    genderdiversity: string
    genderdiversitys: string
  }>({
    genderdiversity: '',
    genderdiversitys: '',
  })
  const history = useHistory()
  const styles = useStyles()
  const dispatch = useDispatch()

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
    dispatch(updateCard())
  }
  const onNextButtonClick = () => {
    history.push(CardRoutes.associateMaritalStatusCard)
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
            title="Associar novo cartão"
            subtitle="Quase lá! Precisamos confirmar alguns dados pessoais"
            description="Com qual gênero você se identifica?"
          />
        }
        main={
          <Box component="form">
            <SearchFilter gender={gender} setGender={setGender}></SearchFilter>
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                onClick={onNextButtonClick}
                endIcon={<KeyboardArrowRight color="secondary" />}
                disabled={!gender.genderdiversity}
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
