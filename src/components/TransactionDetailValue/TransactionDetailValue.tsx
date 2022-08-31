import { Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "./TransactionDetailValue.style";

interface TransactionDetailValueProps {
  className?: string;
}

export const TransactionDetailValue: React.FC<TransactionDetailValueProps> = ({
  className,
  children,
}) => {
  const styles = useStyles();

  const _className = React.useMemo(() => {
    return className
      ? `${styles.transactionDetailValue} ${className}`
      : styles.transactionDetailValue;
  }, [className, styles.transactionDetailValue]);

  return <Typography className={_className}>{children}</Typography>;
};
