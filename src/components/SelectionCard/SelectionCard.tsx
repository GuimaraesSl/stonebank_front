import React from "react";
import { Box, Card, Typography } from "@material-ui/core";
import { useStyles } from "./SelectionCard.style";
import { IconTypes } from "components/Icon/Icon";
import { Icon } from "components/Icon";

interface SelectionCardProps {
  id?: string;
  title: string;
  subtitle?: React.ReactNode | string;
  subsubtitle?: React.ReactNode | string;
  bank?: React.ReactNode | string;
  bankAccount?: React.ReactNode | string;
  bankAccountDigit?: React.ReactNode | string;
  bankBranch?: React.ReactNode | string;
  startIcon?: React.ReactNode | string | keyof typeof IconTypes;
  endIcon?: React.ReactNode | string | keyof typeof IconTypes;
  className?: string;
  onClick?: VoidFunction;
  endLabel?: string;
  variant?: string;
}

export const SelectionCard: React.FC<SelectionCardProps> = ({
  id,
  title,
  subtitle,
  subsubtitle,
  bank,
  bankAccount,
  bankAccountDigit,
  bankBranch,
  startIcon,
  endIcon,
  className,
  onClick,
  endLabel,
  variant,
  ...rest
}: SelectionCardProps) => {
  const styles = useStyles({ variant });
  let start = startIcon as keyof typeof IconTypes;
  let end = endIcon as keyof typeof IconTypes;

  const _className = (() => {
    return className ? `${styles.card} ${className}` : styles.card;
  })();

  return (
    <Card
      className={_className}
      elevation={0}
      onClick={onClick}
      data-test-id="selection-card"
      {...rest}
    >
      {startIcon && (
        <Box
          id="start-icon-column"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon name={start} className={styles.icon} />
        </Box>
      )}
      <Box display="flex" flexDirection="column" className={styles.text}>
        <Typography variant="subtitle1" className={styles.title}>
          <strong>{title}</strong>
        </Typography>
        <Typography id="subtitle" variant="body1" className={styles.subtitle}>
          {subtitle}
        </Typography>
        <Typography id="text" variant="body1" className={styles.subtitle}>
          {bank}
        </Typography>
        <Typography id="text" variant="body1" className={styles.subtitle}>
          {bankAccount?.toString().concat(bankAccountDigit?.toString()!)}
        </Typography>
        <Typography id="text" variant="body1" className={styles.subtitle}>
          {bankBranch}
        </Typography>
        <Typography id="text" variant="body1" className={styles.subtitle}>
          {subsubtitle}
        </Typography>
      </Box>

      {endIcon && (
        <Box
          id="end-icon-column"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {!(end === undefined) ? (
            <Icon name={end} className={styles.endIcon} />
          ) : (
            endIcon
          )}
        </Box>
      )}

      {endLabel && (
        <Typography className={styles.endLabel}>{endLabel}</Typography>
      )}
    </Card>
  );
};
