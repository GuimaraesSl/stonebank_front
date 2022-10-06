/* eslint-disable react-hooks/exhaustive-deps */
import { PixRoutes } from "features/pix";
import { updatePixTransfer, updateState } from "features/pix/redux/actions";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { StoreState } from "redux/state";
import { BankPixTransferDescriptionView } from "./BankPixTransferDescription.view";

export const BankPixTransferDescription: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [description, setDescription] = React.useState("");
  const [openTagEditPopUp, setOpenTagEditPopUp] = React.useState(false);

  const { pixTransfer } = useSelector((state: StoreState) => state.pix);

  const onTagClick = (tag: string) => {
    // dispatch(
    //   updatePixTransfer({ tags: transferenceTags!.filter(t => t !== tag) }),
    // )
  };

  const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(event.target.value);

  const onEditTagsButtonClick = () => {
    setOpenTagEditPopUp(true);
  };

  const onEditTagsClose = () => {
    setOpenTagEditPopUp(false);
  };

  const onConfirmButtonClick = () => {
    dispatch(updatePixTransfer({ ...pixTransfer, description: description }));
    history.push(PixRoutes.keyPixTransferSummary);
  };

  const onCancelButtonClick = React.useCallback(() => {
    dispatch(updateState());
    history.push(PixRoutes.pixArea);
  }, []);

  return (
    <BankPixTransferDescriptionView
      description={description}
      openTagEditPopUp={openTagEditPopUp}
      // loading={loading}
      // transferenceTags={transferenceTags!}
      onTagClick={onTagClick}
      onDescriptionChange={onDescriptionChange}
      onEditTagsClose={onEditTagsClose}
      onEditTagsButtonClick={onEditTagsButtonClick}
      onConfirmButtonClick={onConfirmButtonClick}
      onCancelButtonClick={onCancelButtonClick}
    />
  );
};
