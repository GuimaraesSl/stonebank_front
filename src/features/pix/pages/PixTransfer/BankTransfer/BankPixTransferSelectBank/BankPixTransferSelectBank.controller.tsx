/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useHistory } from "react-router-dom";
import { PixRoutes } from "features/pix";
import { BankPixTransferSelectBankView } from "./BankPixTransferSelectBank.view";
import { useDispatch, useSelector } from "react-redux";
import { updatePixTransfer, updateState } from "features/pix/redux/actions";
import { Bank } from "features/pix/redux/models/bank";
import { StoreState } from "redux/state";

export const BankPixTransferSelectBank: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { pixTransfer, bankList } = useSelector(
    (state: StoreState) => state.pix
  );

  const [toBank, setToBank] = React.useState("");
  const [toBankName, setToBankName] = React.useState("");
  const [selectedBank, setSelectedBank] = React.useState(false);
  const [displayBanks, setDisplayBanks] = React.useState(bankList);

  React.useEffect(() => {
    if (toBank.length === 0) setSelectedBank(true);
    else setSelectedBank(false);
  }, [toBank]);

  const _search = (value: string) => {
    value = value.replace(/^\s+|\s+$/, "").toLowerCase();

    const result = bankList?.filter(
      (bank: { code: string | string[]; name: string }) =>
        bank.code.includes(value.replace(/^0/, "")) ||
        bank.name.toLowerCase().includes(value)
    );

    setDisplayBanks(result);
  };

  const onCancelButtonClick = () => {
    dispatch(updateState());
    history.push(PixRoutes.pixArea);
  };

  const onBackButtonClick = () => {
    dispatch(updatePixTransfer({ ...pixTransfer, toTaxId: undefined }));
    history.goBack();
  };

  const onBankClick = (bank: Bank) => {
    setToBank(bank.code);
    setToBankName(bank.name);
  };

  const onConfirmButtonClick = () => {
    dispatch(
      updatePixTransfer({
        ...pixTransfer,
        toBank: toBank,
        toBankName: toBankName,
      })
    );
    history.push(PixRoutes.bankPixTransferAccountType);
  };

  return (
    <BankPixTransferSelectBankView
      selectedBank={selectedBank}
      toBank={toBank}
      name={pixTransfer?.toName}
      displayBanks={displayBanks}
      _search={_search}
      onBankClick={onBankClick}
      onCancelButtonClick={onCancelButtonClick}
      onConfirmButtonClick={onConfirmButtonClick}
      onBackButtonClick={onBackButtonClick}
    />
  );
};
