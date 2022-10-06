/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { PixRoutes } from "features/pix";
import { useHistory } from "react-router-dom";
import { QrCodePixTransferValueView } from "./QrCodePixTransferValue.view";
import { useValue } from "hooks/useValue";
import { casting, maskMoney } from "_utils/masks/money";
import { parseCurrency, ShortDateFormatter } from "_translate";
import { compareTransferDates } from "features/transference/_utils";
import { useSelector } from "react-redux";
import { StoreState } from "redux/state";
import { useDispatch } from "react-redux";
import { updatePixTransfer, updateState } from "features/pix/redux/actions";

export const QrCodePixTransferValue: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [transferDate, setTransferDate] = React.useState<Date | null>(null);
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const [displayDate, setDisplayDate] = React.useState("");
  const [maxDate, setMaxDate] = React.useState<Date>(new Date());
  const [minDate, setMinDate] = React.useState<Date>(new Date());
  const [valueInput, setValueInput] = useValue(maskMoney);
  const [isValidValue, setIsValidValue] = React.useState(false);
  const [balanceIsValid, setBalanceIsValid] = React.useState(Boolean);

  const { pixTransfer } = useSelector((state: StoreState) => state.pix);

  const { balance } = useSelector((store: StoreState) => ({
    balance: store.account.dashboard!.balance,
  }));

  React.useEffect(() => {
    setDisplayDate(_getDisplayDate());
    const today = new Date();
    setMaxDate(today);
  }, [transferDate]);

  React.useEffect(() => {
    const convertedValue = casting(valueInput);
    setIsValidValue(convertedValue > 0 && convertedValue <= balance);
    setBalanceIsValid(convertedValue <= balance);
  }, [valueInput]);

  const onConfirmButtonClick = () => {
    dispatch(
      updatePixTransfer({
        ...pixTransfer,
        value: parseFloat(parseCurrency(valueInput).toFixed(2)),
        paymentDate: !transferDate ? minDate : transferDate,
      })
    );
    history.push(PixRoutes.keyPixTransferDescription);
  };

  const onCancelButtonClick = () => {
    dispatch(updateState());
    history.push(PixRoutes.pixArea);
  };

  const onSchedulingButtonClick = () => {
    setOpenDatePicker(true);
  };

  const onDatePickerClose = () => {
    setOpenDatePicker(false);
  };

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(event.target.value);
  };

  const onDateChange = (date: Date | null) => {
    setTransferDate(date);
  };

  const _getDisplayDate = () => {
    const today = "Hoje";

    if (!transferDate) return today;
    else if (compareTransferDates(transferDate, new Date()) === 0) return today;
    else return ShortDateFormatter.format(transferDate);
  };

  return (
    <QrCodePixTransferValueView
      valueInput={valueInput}
      isValidValue={isValidValue}
      displayDate={displayDate}
      minDate={minDate}
      balanceIsValid={balanceIsValid}
      pixTransfer={pixTransfer}
      openDatePicker={openDatePicker}
      onDatePickerClose={onDatePickerClose}
      onValueChange={onValueChange}
      onSchedulingButtonClick={onSchedulingButtonClick}
      onDateChange={onDateChange}
      _getDisplayDate={_getDisplayDate}
      onCancelButtonClick={onCancelButtonClick}
      onConfirmButtonClick={onConfirmButtonClick}
    />
  );
};
