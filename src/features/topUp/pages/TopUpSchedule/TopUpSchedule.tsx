import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "@material-ui/core";
import { KeyboardArrowRight } from "@material-ui/icons";
import { PageContainer } from "components/PageContainer";
import { ProcessPageLayout } from "components/ProcessPageLayout";
import { AppBar } from "components/AppBar";
import { ProcessPageFooter } from "components/ProcessPageFooter";
import { ProcessDescriptionHeader } from "components/ProcessDescriptionHeader";
import { Button } from "components/Button";
import { ContentBalance } from "features/topUp/components/ContentBalance";
import { TopUpRoutes } from "features/topUp/constants/routes";
import { AccountRoutes } from "features/account/constants/routes";
import { useStyle } from "./TopUpSchedule.style";
import { useSelector } from "react-redux";
import { StoreState } from "redux/state";
import { nextLabel } from "constants/buttons/labels";
import { useDispatch } from "react-redux";
import { Icon } from "components/Icon";
import { updateTopUpData } from "features/topUp/redux/actions";
import { SchedulingButton } from "components/SchedulingButton";
import { FailTopUpState } from "features/topUp/redux/state";
import { TextField } from "components/TextField";
import { CurrencyFormatter, ShortDateFormatter } from "_translate";
import { compareTransferDates } from "features/transference/_utils";

export const TopUpSchedule: React.FC = () => {
  const { topUp, scheduleTopUp } = useSelector(
    (state: StoreState) => state.topUp
  );
  const balance: number = useSelector(
    (store: StoreState) => store.account.dashboard?.balance!
  );
  const [visibilityRepeatDays, setVisibilityRepeatDays] =
    React.useState("none");
  const [isSwitchChecked, setIsSwitchChecked] = React.useState(scheduleTopUp);
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const [minDate] = React.useState<Date>(new Date());
  const fail = topUp instanceof FailTopUpState;
  const errorBalance = balance! < topUp?.topUpProduct?.productValue!;
  const [displayDate, setDisplayDate] = React.useState("");
  const [topUpDate, setTopUpDate] = React.useState<Date | null>(
    new Date(Date.now())
  );

  React.useEffect(() => {
    setDisplayDate(_getDisplayDate());
  }, [topUpDate]);

  const _getDisplayDate = () => {
    const today = "Hoje";
    if (!topUpDate) return today;
    else if (compareTransferDates(topUpDate, new Date()) === 0) return today;
    else return ShortDateFormatter.format(topUpDate);
  };

  const onSchedulingButtonClick = () => {
    setOpenDatePicker(true);
  };

  const onDatePickerClose = () => {
    setOpenDatePicker(false);
  };

  const onStartDateChange = (date: Date | null) => {
    if (date) {
      setTopUpDate(date);
      dispatch(updateTopUpData({ topUpDate: date }));
    }
  };

  useEffect(() => {
    isSwitchChecked
      ? setVisibilityRepeatDays("block")
      : setVisibilityRepeatDays("none");
  }, [isSwitchChecked]);

  const styles = useStyle({ visibilityRepeatDays });
  const history = useHistory();
  const dispatch = useDispatch();

  const userCellNumber = topUp?.phoneNumber;
  const creditValue = topUp?.topUpProduct?.productValue.toFixed(2);

  const onNextButtonClick = () => {
    isSwitchChecked
      ? history.push(TopUpRoutes.periodicRepetition)
      : history.push(TopUpRoutes.completeTopUp);

    dispatch(
      updateTopUpData({
        topUpDate: topUpDate!,
        isRecurrent: isSwitchChecked,
      })
    );
  };

  const handleSwitchInput = () => {
    if (scheduleTopUp) {
      setIsSwitchChecked(false);
    } else {
      setIsSwitchChecked(!isSwitchChecked);
    }
  };

  return (
    <React.Fragment>
      <PageContainer>
        <ProcessPageLayout
          appBar={<AppBar homeRoute={AccountRoutes.home} />}
          header={
            <Box className={styles.headerStyle}>
              <ProcessDescriptionHeader
                title={"Recargas"}
                subtitle={"Celular pré-pago"}
                description={`Recarregar meu número ${userCellNumber}`}
              />
            </Box>
          }
          main={
            <React.Fragment>
              <Box
                className={styles.contentBalanceContainerReference}
                data-test-id="content-balance"
              >
                <Box className="contentBalanceContainer">
                  <ContentBalance balance={CurrencyFormatter.format(balance)} />
                </Box>
              </Box>
              <Box
                className={styles.creditRequestContainer}
                data-test-id="credit-request"
              >
                {/*  <Icon name={'timIcon'} /> */}
                <Box className="wrapper">
                  <p>R$ {creditValue}</p>
                  <span>Válido por 30 dias</span>
                </Box>
              </Box>
              <Box
                className={styles.dateInputContainer}
                data-test-id="date-input"
              >
                <TextField
                  data-test-id="display-date"
                  label="Quando?"
                  placeholder="Hoje"
                  value={displayDate}
                />
              </Box>
              <Box className={styles.scheduleButtonContainer}>
                <SchedulingButton
                  data-test-id="schedule-button"
                  open={openDatePicker}
                  value={topUpDate}
                  minDate={minDate}
                  onClick={onSchedulingButtonClick}
                  onDateSelection={onStartDateChange}
                  onClose={onDatePickerClose}
                  disabled={fail || errorBalance}
                />
              </Box>
              {/* <Box className={styles.switchContainer}>
                <span className="switchContainerLabel" data-test-id="switch">
                  Repetir essa recarga
                </span>
                <SwitchIOS
                  onClick={handleSwitchInput}
                  checked={isSwitchChecked}
                />
              </Box> */}
            </React.Fragment>
          }
          footer={
            <Box>
              <ProcessPageFooter
                primaryButton={
                  <Button
                    data-test-id="next-button"
                    onClick={onNextButtonClick}
                    endIcon={<KeyboardArrowRight color="secondary" />}
                  >
                    {nextLabel}
                  </Button>
                }
              />
            </Box>
          }
        />
      </PageContainer>
    </React.Fragment>
  );
};
