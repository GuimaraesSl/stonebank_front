import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { TransferenceRoutes } from "features/transference/constants/routes";
import { PaymentRoutes } from "features/payment/constants/routes";
import { QrCodeTransferRoutes } from "features/qrCodeTransfer/constants/routes";
import { CardRoutes } from "features/card/constants/routes";
import { TopUpRoutes } from "features/topUp/constants/routes";
import { SquareButtonWithIcon } from "components/SquareButtonWithIcon";
import { useStyles } from "./FeaturesList.style";
import { SchedulePayments } from "features/schedulePayments/constants/routes";
import { DigitalWithdrawalRoutes } from "features/digitalWithdrawal/constants/routes";
import { PixRoutes } from "features/pix/constants/routes";
import { StoreState } from "redux/state";
import { useSelector } from "react-redux";
import { UiFunction } from "features/account/redux/models/uiFunction";
interface FeaturesListProps {
  className?: string;
}

export const FeaturesList: React.FC<FeaturesListProps> = ({ className }) => {
  const uiFunctions = useSelector(
    (state: StoreState) => state.account.dashboard?.uiFunctions
  );

  const [myUiFunctions, setMyUiFunctions] = useState<UiFunction[]>(
    uiFunctions || []
  );

  useEffect(() => {
    setMyUiFunctions([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    ]);
  }, []);

  const AccountState = useSelector(
    (store: StoreState) => store.account.account
  );

  const history = useHistory();
  const styles = useStyles();

  const onTransferButtonClick = () => {
    history.push(TransferenceRoutes.transference);
  };

  const onPaymentButtonClick = () => {
    history.push(PaymentRoutes.barcodePayment);
  };

  const onQrCodeTransferClick = () => {
    history.push(QrCodeTransferRoutes.qrCodeTransfer);
  };

  const onPixClick = () => {
    history.push(PixRoutes.pixArea);
  };

  const onTopUpButtonClick = () => {
    history.push(TopUpRoutes.topUp);
  };

  const onCardManagementClick = () => {
    history.push(CardRoutes.cardManagement);
  };

  const onSchedulePaymentsClick = () => {
    history.push(SchedulePayments.ScheduleTransactions);
  };

  const onDigitalWithdrawalClick = () => {
    history.push(DigitalWithdrawalRoutes.digitalWithdrawalStart);
  };

  return (
    <Box
      display="grid"
      gridTemplateColumns="auto auto auto"
      gridAutoColumns="auto"
      gridRowGap="12px"
      gridColumnGap="8px"
      className={className}
    >
      {(myUiFunctions?.includes(UiFunction.internalTransfer) ||
        myUiFunctions?.includes(UiFunction.moneyTransfer)) && (
        <Box className={styles.featureItem}>
          <SquareButtonWithIcon
            label="Transferência"
            icon={"transfer"}
            onClick={onTransferButtonClick}
            data-test-id="transfer-button"
          />
        </Box>
      )}
      {myUiFunctions?.includes(UiFunction.boletoPayment) && (
        <Box className={styles.featureItem}>
          <SquareButtonWithIcon
            label="Pagamento"
            icon={"payment"}
            onClick={onPaymentButtonClick}
            data-test-id="payment-button"
          />
        </Box>
      )}
      {myUiFunctions?.includes(UiFunction.pix) && AccountState?.spbBank && (
        <Box className={styles.featureItem}>
          <SquareButtonWithIcon
            label={"Pix"}
            icon={"pix"}
            onClick={onPixClick}
            data-test-id="pix-button"
          />
        </Box>
      )}
      {(myUiFunctions?.includes(UiFunction.generateQrCode) ||
        myUiFunctions?.includes(UiFunction.readQrCode)) && (
        <Box className={styles.featureItem}>
          <SquareButtonWithIcon
            label={"QRCode"}
            icon={"qrCode"}
            onClick={onQrCodeTransferClick}
            data-test-id="qrcode-button"
          />
        </Box>
      )}
      {myUiFunctions?.includes(UiFunction.topUp) && (
        <Box className={styles.featureItem}>
          <SquareButtonWithIcon
            label={"Recarga"}
            icon={"topUp"}
            onClick={onTopUpButtonClick}
            data-test-id="top-up-button"
          />
        </Box>
      )}
      {myUiFunctions?.includes(UiFunction.findCardList) && (
        <Box className={styles.featureItem}>
          <SquareButtonWithIcon
            label={"Cartões"}
            icon={"cardManagement"}
            onClick={onCardManagementClick}
            data-test-id="card-button"
          />
        </Box>
      )}
      {myUiFunctions?.includes(UiFunction.futureTransactions) && (
        <Box className={styles.featureItem}>
          <SquareButtonWithIcon
            label={"Agendamentos"}
            icon={"shedulePayment"}
            onClick={onSchedulePaymentsClick}
            data-test-id="schedule-button"
          />
        </Box>
      )}
      {myUiFunctions?.includes(UiFunction.digitalWithdrawal) && (
        <Box className={styles.featureItem}>
          <SquareButtonWithIcon
            label={"Saque"}
            icon={"digitalWithdrawal"}
            onClick={onDigitalWithdrawalClick}
            data-test-id="digital-withdrawal"
          />
        </Box>
      )}
    </Box>
  );
};
