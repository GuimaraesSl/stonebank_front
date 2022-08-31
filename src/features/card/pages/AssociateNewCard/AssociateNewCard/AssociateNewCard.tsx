import React from 'react'
import { useStyles } from './AssociateNewCard.style'
import { Box, Card } from '@material-ui/core'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AppBar } from 'components/AppBar'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { Button } from 'components/Button'
import { KeyboardArrowRight } from '@material-ui/icons'
import { InsertIdCard } from 'features/card/components/Inputs/InsertIdCard'
import { ReadQrCodeButton } from 'features/card/components/ReadQrCodeButton'
import { useHistory } from 'react-router-dom'
import { CardRoutes } from 'features/card/constants/routes'
import { AccountRoutes } from 'features/account/constants/routes'
import { useMask } from 'hooks/useMask'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { updateCard } from 'features/card/redux/actions'

export const AssociateNewCard: React.FC = () => {
  const styles = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const [valueIdCard, setValueIdCard] = React.useState('')
  const card = useSelector((store: StoreState) => store.card.card)

  const onNextButtonClick = () => {
    history.push(CardRoutes.activeFourDigits)
    dispatch(
      updateCard({
        ...card!,
        identifierCard: valueIdCard,
      }),
    )
  }

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={<AppBar homeRoute={AccountRoutes.home} />}
        header={
          <Box className={styles.headerWrapper}>
            <ProcessDescriptionHeader
              title={'Associar novo cartão'}
              subtitle={'Primeiro vamos associá-lo à sua conta'}
              description={
                'Insira o código de identificação de 9 dígitos impresso em seu cartão'
              }
            />
          </Box>
        }
        main={
          <React.Fragment>
            <InsertIdCard value={valueIdCard} setValue={setValueIdCard} />
            {/* <ReadQrCodeButton /> */}
          </React.Fragment>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                disabled={valueIdCard.length !== 9}
                onClick={onNextButtonClick}
                endIcon={<KeyboardArrowRight color="secondary" />}
                data-test-id="next-button"
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
