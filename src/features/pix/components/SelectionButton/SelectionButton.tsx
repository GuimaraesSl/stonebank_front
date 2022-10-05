import React from "react";
import { Box, Card, Typography } from "@material-ui/core";
import { useStyles } from "./SelectionButton.style";

interface SelectionButtonProps {
  title?: string;
  bank?: React.ReactNode | string;
  bankAccount?: React.ReactNode | string;
  bankBranch?: React.ReactNode | string;
  subtitle?: React.ReactNode | string;
  subsubtitle?: React.ReactNode | string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode | string;
  id?: string;
  className?: string;
  qrCodeButton?: string;
  onClick?: VoidFunction;
  onClose?: VoidFunction;
}

export const SelectionButton: React.FC<SelectionButtonProps> = ({
  title,
  bank,
  bankAccount,
  bankBranch,
  subtitle,
  subsubtitle,
  startIcon,
  endIcon,
  id,
  className,
  qrCodeButton,
  onClick,
  onClose,
}: SelectionButtonProps) => {
  const styles = useStyles();

  const _className = (() => {
    return className ? `${styles.Button} ${className}` : styles.Button;
  })();

  return (
    <Card
      id={id}
      className={_className}
      elevation={0}
      onClick={onClick}
      data-test-id="selection-button"
    >
      {startIcon && (
        <Box
          id="start-icon-column"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {typeof startIcon === "string" ? (
            <img
              id="start-icon"
              src={startIcon}
              alt={title + " icon"}
              className={styles.icon}
            />
          ) : (
            React.cloneElement(startIcon as any, {
              className: styles.icon,
              id: "start-icon",
            })
          )}
        </Box>
      )}
      <Box
        id="text-column"
        display="flex"
        flexDirection="column"
        className={styles.text}
      >
        <Typography id="title" variant="subtitle1" className={styles.title}>
          <strong>{title}</strong>
        </Typography>
        <Typography id="subtitle" variant="body1" className={styles.subtitle}>
          {subtitle}
        </Typography>
        <Typography id="text" variant="body1" className={styles.subtitle}>
          {bank}
        </Typography>
        <Typography id="text" variant="body1" className={styles.subtitle}>
          {bankAccount}
        </Typography>
        <Typography id="text" variant="body1" className={styles.subtitle}>
          {bankBranch}
        </Typography>
        <Typography id="text" variant="body1" className={styles.subtitle}>
          {subsubtitle}
        </Typography>
        <Typography
          id="qrCodeButton"
          variant="subtitle1"
          className={styles.qrCodeButton}
        >
          {qrCodeButton}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        {typeof endIcon === "string" ? (
          <img src={endIcon} alt={title + " icon"} className={styles.endIcon} />
        ) : (
          endIcon
        )}
      </Box>
    </Card>
  );
};
