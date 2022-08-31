import { Box, Typography, TextField, InputLabel } from '@material-ui/core'
import { ChevronRight, Close } from '@material-ui/icons'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon'
import { PageContainer } from 'components/PageContainer'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import React from 'react'
import { useStyles } from './SelectValue.style'
import { useHistory } from 'react-router-dom'
import { DigitalWithdrawalRoutes } from 'features/digitalWithdrawal/constants/routes'
import { AccountRoutes } from 'features/account/constants/routes'
import { StoreState } from 'redux/state'
import { useSelector } from 'react-redux'
import { CurrencyFormatter } from '_translate'

export const SelectValue: React.FC = () => {
  const [valueWithdrawal, setValueWithdrawal] = React.useState(0)
  const styles = useStyles({ valueWithdrawal })
  const history = useHistory()
  const { balance } = useSelector((store: StoreState) => ({
    balance: store.account.dashboard!.balance,
  }))
  const [disableNextButton, setDisableNextButton] = React.useState(false)

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
  }
  const onNextButtonClick = () => {
    history.push(DigitalWithdrawalRoutes.digitalWithdrawalSummary)
  }

  const onCleanValueButtonClick = () => {
    setValueWithdrawal(0)
  }

  React.useEffect(() => {
    valueWithdrawal !== 0
      ? setDisableNextButton(false)
      : setDisableNextButton(true)
  }, [valueWithdrawal])

  const onAddValueButtonClick = (addValue: number) => {
    const newValue = valueWithdrawal + addValue
    if (newValue > balance || newValue > 1200) return
    setValueWithdrawal(valueWithdrawal + addValue)
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
          <Box>
            <ProcessDescriptionHeader title="Saque digital" />
            <Box className={`${styles.topSide} ${styles.centerContent}`}>
              <Box className={styles.currentBalance}>
                <Typography>
                  Seu saldo <strong>{CurrencyFormatter.format(balance)}</strong>
                </Typography>
              </Box>

              <InputLabel className={styles.valueLabel} htmlFor="value">
                Quanto deseja sacar?
              </InputLabel>
              <Typography className={styles.valueInput}>
                {valueWithdrawal
                  ? `${CurrencyFormatter.format(valueWithdrawal)}`
                  : 'R$ 0,00'}
              </Typography>
            </Box>
          </Box>
        }
        main={
          <Box>
            <Box className={`${styles.bottomSide} ${styles.centerContent}`}>
              <Typography className={styles.limitWrapper}>
                Limite por saque R$ 1.200,00 Limite diário disponível R$ 600,00
              </Typography>

              <Typography className={styles.addValueTitle}>
                Adicione valores à seu saque
              </Typography>

              <Box className={styles.buttonGroup}>
                {[20, 50, 100, 300, 500, 1000].map((value, key) => (
                  <Button
                    key={key}
                    onClick={() => onAddValueButtonClick(value)}
                    palette="secondary"
                  >
                    + R$ <span>{value}</span>,00
                  </Button>
                ))}
              </Box>

              <ButtonWithFloatingIcon
                className={styles.valueWithdrawal}
                onClick={onCleanValueButtonClick}
              >
                Limpar valor
              </ButtonWithFloatingIcon>

              <Box className={styles.descriptionWrapper}>
                <Typography className={styles.description}>
                  O caixa do Banco24horas dispõe notas de R$20,00, R$50,00 e
                  R$100,00
                </Typography>
                <Typography className={styles.description}>
                  Taxa de serviço de R$10,80 por saque
                </Typography>
              </Box>
            </Box>
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                onClick={onNextButtonClick}
                endIcon={<ChevronRight color="secondary" />}
                disabled={disableNextButton}
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
