import React from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { TopUpRoutes } from 'features/topUp/constants/routes'
import { useStyles } from './PeriodicRepetition.style'
import { ListButtonRadio } from 'features/topUp/components/ListButton/ListButtonRadio'
import { useDispatch, useSelector } from 'react-redux'
import { updateTopUpData } from 'features/topUp/redux/actions'
import { StoreState } from 'redux/state'

export const PeriodicRepetition: React.FC = () => {
  const style = useStyles()
  const [selectedValue, setSelectedValue] = React.useState('')
  const topUpState = useSelector((store: StoreState) => store.topUp.topUp)
  const dispatch = useDispatch()
  const history = useHistory()

  const onClickOption = () => {
    history.push(TopUpRoutes.completeTopUp)
  }

  const onClickValue = (days: number) => {
    dispatch(updateTopUpData({...topUpState, periodicRepetition: days}))
  }

  return (
    <Box className={style.contentPage}>
      <PageContainer>
        <ProcessPageLayout
          header={
            <React.Fragment>
              <Typography variant="body1" className={style.description}>
                Repetir a recarga periodicamente
              </Typography>
            </React.Fragment>
          }
          main={
            <Box className={style.main}>
              <ListButtonRadio
                title="Repetir a cada 15 dias"
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
                goToRoute={TopUpRoutes.topUpSchedule}
                onClick={() => {
                  onClickValue(15)
                  onClickOption() 
                  }
                }
                data-test-id="top-up-schedule-15"
              ></ListButtonRadio>
              <ListButtonRadio
                title="Repetir a cada 30 dias"
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
                goToRoute={TopUpRoutes.topUpSchedule}
                onClick={() => {
                  onClickValue(30) 
                  onClickOption() 
                  }
                }
                  data-test-id="top-up-schedule-30"
              ></ListButtonRadio>
              <ListButtonRadio
                title="Repetir a cada 60 dias"
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
                goToRoute={TopUpRoutes.topUpSchedule}
                onClick={() => {
                  onClickValue(60)
                  onClickOption()
                  }
                }
                 data-test-id="top-up-schedule-60"
              ></ListButtonRadio>
            </Box>
          }
          footer={<ProcessPageFooter />}
        />
      </PageContainer>
    </Box>
  )
}
