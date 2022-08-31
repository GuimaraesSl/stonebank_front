import { Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "./TransactionDetailName.style";

interface TransactionDetailNameView {
  className?: string;
}

export const TransactionDetailName: React.FC<TransactionDetailNameView> = ({
  className,
  children,
}) => {
  const styles = useStyles();

  const _className = React.useMemo(() => {
    return className
      ? `${styles.transactionDetailName} ${className}`
      : styles.transactionDetailName;
  }, [className, styles.transactionDetailName]);

  return <Typography className={_className}>{children}</Typography>;
};
