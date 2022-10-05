import React from "react";
import { useHistory } from "react-router";
import { Box } from "@material-ui/core";
import { KeyboardArrowLeft } from "@material-ui/icons";
import { Button } from "components/Button";
import { returnLabel } from "constants/buttons/labels";
import { useStyles } from "./ProcessPageFooter.style";

interface ProcessPageFooterProps {
  primaryButton?: React.ReactNode;
  secondaryButton?: React.ReactNode;
  onBackButtonClick?: VoidFunction;
}

export const ProcessPageFooter: React.FC<ProcessPageFooterProps> = ({
  primaryButton,
  secondaryButton,
  onBackButtonClick: onBackButtonClickCallback,
}) => {
  const styles = useStyles();
  const history = useHistory();

  const onBackButtonClick = () => {
    onBackButtonClickCallback?.call(this);
    history.goBack();
  };

  return (
    <Box className={styles.buttonsWrapper}>
      {secondaryButton || (
        <Button
          palette="secondary"
          startIcon={<KeyboardArrowLeft color="secondary" />}
          onClick={onBackButtonClick}
          data-test-id="back-button"
        >
          {returnLabel}
        </Button>
      )}
      {primaryButton}
    </Box>
  );
};
