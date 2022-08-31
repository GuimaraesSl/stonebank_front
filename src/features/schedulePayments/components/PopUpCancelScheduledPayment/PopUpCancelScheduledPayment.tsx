import React from 'react'
import { Button } from 'components/Button'
import { Close } from '@material-ui/icons'
import { Drawer, Grid } from '@material-ui/core'
import { Box, Typography } from '@material-ui/core'
import { PageContainer } from 'components/PageContainer'
import { Button as ButtonConfirm } from '@material-ui/core'
import { useStyle } from './PopUpCancelScheduledPayment.style'
import { useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { CurrencyFormatter } from '_translate'

interface PopUpBlockProps {
  open: boolean
  onClose: (args?: boolean) => void
}

export const PopUpCancelScheduledPayment: React.FC<PopUpBlockProps> = ({
  open,
  onClose,
}) => {
  const paymentList = useSelector(
    (state: StoreState) => state.futureTransactions.futureTransaction!,
  )

  const styles = useStyle()
  const [displayPaymentList, setDisplayPaymentList] =
    React.useState(paymentList)

  React.useEffect(() => {
    setDisplayPaymentList(paymentList)
  }, [paymentList])

  const onCloseButtonClick = () => {
    onClose(false)
  }

  const onConfirmButtonClick = () => {
    onClose(true)
  }

  return (
    <React.Fragment>
      <Drawer
        className={styles.drawer}
        anchor="bottom"
        open={open}
        onClose={() => onClose(false)}
        data-test-id="drawer"
      >
        <PageContainer>
          <Box className={styles.content}>
            <Box className={styles.closeButton}>
              <Button
                size="small"
                palette="secondary"
                onClick={onCloseButtonClick}
                startIcon={<Close color="primary" />}
                data-test-id="cancel-button"
              >
                Fechar
              </Button>
            </Box>
            <Grid
              container
              direction="column"
              spacing={4}
              data-test-id="pop-up-cancel"
            >
              <Grid item>
                <Typography className={styles.titlePopUp}>
                  Deseja realmente cancelar ?
                </Typography>
                <Grid item className={styles.description}>
                  <Typography className={styles.textDescription}>
                    {displayPaymentList?.typeDescription}
                  </Typography>
                  <Typography className={styles.descriptionValue}>
                    {CurrencyFormatter.format(displayPaymentList?.principalValue!)}
                  </Typography>
                  <Typography className={styles.textDescription}>
                    {!displayPaymentList?.name
                      ? ''
                      : 'para ' + displayPaymentList?.name}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Box className={styles.confirmButton}>
                  <ButtonConfirm
                    className={styles.button}
                    size="small"
                    onClick={onConfirmButtonClick}
                    startIcon={<Close color="primary" />}
                    data-test-id="confirm-button"
                  >
                    Sim
                  </ButtonConfirm>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </PageContainer>
      </Drawer>
    </React.Fragment>
  )
}
