import React from "react";
import { Box } from "@material-ui/core";
import { useStyles } from "./TransactionDetail.style";

interface TransactionDetailProps {
  className?: string;
}

export const TransactionDetail: React.FC<TransactionDetailProps> = ({
  className,
  children,
}) => {
  const styles = useStyles();

  const _className = React.useMemo(() => {
    return className
      ? `${styles.transactionDetail} ${className}`
      : styles.transactionDetail;
  }, [className, styles.transactionDetail]);

  return <Box className={_className}>{children}</Box>;
};
