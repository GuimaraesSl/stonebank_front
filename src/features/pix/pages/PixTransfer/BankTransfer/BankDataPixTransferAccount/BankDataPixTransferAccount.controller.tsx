/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useHistory } from "react-router-dom";
import { PixRoutes } from "features/pix";
import { BankDataPixTransferAccountView } from "./BankDataPixTransferAccount.view";
import { useDispatch, useSelector } from "react-redux";
import { updatePixTransfer, updateState } from "features/pix/redux/actions";
import { useMask } from "hooks/useMask";
import { maskTransference } from "_utils/masks/transferenceNumber";
import { StoreState } from "redux/state";

export const BankDataPixTransferAccount: React.FC = () => {
  const [toBankAccount, setToBankAccount] = useMask(maskTransference);

  const history = useHistory();

  const dispatch = useDispatch();

  const onToBankAccountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setToBankAccount(event.target.value);
  };

  const { pixTransfer } = useSelector((state: StoreState) => state.pix);

  const _splitToBankAccountFromDigit = (): [string, string] => {
    return [
      toBankAccount.substring(0, toBankAccount.length - 1),
      Array.from(toBankAccount).pop()!,
    ];
  };

  const onCancelButtonClick = React.useCallback(() => {
    dispatch(updateState());
    history.push(PixRoutes.pixArea);
  }, []);

  const onConfirmButtonClick = () => {
    const [bankAccount, bankAccountDigit] = _splitToBankAccountFromDigit();

    if (toBankAccount.length >= 5) {
      dispatch(
        updatePixTransfer({
          ...pixTransfer,
          toBankAccount: bankAccount,
          toBankAccountDigit: bankAccountDigit,
        })
      );
      history.push(PixRoutes.bankPixTransferValue);
    }
  };

  return (
    <BankDataPixTransferAccountView
      toBankAccount={toBankAccount}
      isValidValue={toBankAccount.length < 5}
      onConfirmButtonClick={onConfirmButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      onToBankAccountChange={onToBankAccountChange}
    />
  );
};
