import React from "react";
import { useHistory } from "react-router-dom";
import { PixRoutes } from "features/pix";
import { BankDataPixTransferBranchView } from "./BankDataPixTransferBranch.view";
import { useDispatch, useSelector } from "react-redux";
import { updatePixTransfer, updateState } from "features/pix/redux/actions";
import { maskTransference } from "_utils/masks/transferenceNumber";
import { useMask } from "hooks/useMask";
import { StoreState } from "redux/state";

export const BankDataPixTransferBranch: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [toBankBranch, setToBankBranch] = useMask(maskTransference);

  const { pixTransfer } = useSelector((state: StoreState) => state.pix);

  const onToBankBranchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 4) setToBankBranch(event.target.value);
  };

  const onCancelButtonClick = () => {
    dispatch(updateState());
    history.push(PixRoutes.pixArea);
  };

  const onConfirmButtonClick = React.useCallback(() => {
    dispatch(updatePixTransfer({ ...pixTransfer, toBankBranch: toBankBranch }));
    history.push(PixRoutes.bankDataPixTransferAccount);
  }, [toBankBranch]);

  return (
    <BankDataPixTransferBranchView
      toBankBranch={toBankBranch}
      isValidValue={toBankBranch.length === 0}
      onConfirmButtonClick={onConfirmButtonClick}
      onToBankBranchChange={onToBankBranchChange}
      onCancelButtonClick={onCancelButtonClick}
    />
  );
};
