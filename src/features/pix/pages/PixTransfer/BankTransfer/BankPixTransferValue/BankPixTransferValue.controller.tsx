/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { PixRoutes } from "features/pix";
import { useHistory } from "react-router-dom";
import { BankPixTransferValueView } from "./BankPixTransferValue.view";
import { useValue } from "hooks/useValue";
import { casting, maskMoney } from "_utils/masks/money";
import { parseCurrency, ShortDateFormatter } from "_translate";
import { compareTransferDates } from "features/transference/_utils";
import { useSelector } from "react-redux";
import { StoreState } from "redux/state";
import { useDispatch } from "react-redux";
import { updatePixTransfer, updateState } from "features/pix/redux/actions";

export const BankPixTransferValue: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [transferDate, setTransferDate] = React.useState<Date | null>(null);
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const [displayDate, setDisplayDate] = React.useState("");
  const [valueInput, setValueInput] = useValue(maskMoney);
  const [isValidValue, setIsValidValue] = React.useState(false);
  const [balanceIsValid, setBalanceIsValid] = React.useState(Boolean);

  const { pixTransfer } = useSelector((state: StoreState) => state.pix);

  const { balance } = useSelector((store: StoreState) => ({
    balance: store.account.dashboard!.balance,
  }));

  React.useEffect(() => {
    setDisplayDate(_getDisplayDate());
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
        paymentDate: !transferDate ? new Date() : transferDate,
      })
    );
    history.push(PixRoutes.keyPixTransferDescription);
  };

  const onBackButtonClick = () => {
    dispatch(
      updatePixTransfer({
        ...pixTransfer,
        value: undefined,
        paymentDate: undefined,
      })
    );
    history.goBack();
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
    <BankPixTransferValueView
      valueInput={valueInput}
      isValidValue={isValidValue}
      displayDate={displayDate}
      minDate={new Date()}
      openDatePicker={openDatePicker}
      balanceIsValid={balanceIsValid}
      payeeData={pixTransfer}
      onValueChange={onValueChange}
      onDatePickerClose={onDatePickerClose}
      onSchedulingButtonClick={onSchedulingButtonClick}
      onDateChange={onDateChange}
      onCancelButtonClick={onCancelButtonClick}
      onConfirmButtonClick={onConfirmButtonClick}
      onBackButtonClick={onBackButtonClick}
    />
  );
};
