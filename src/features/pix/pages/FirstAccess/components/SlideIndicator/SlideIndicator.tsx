import React from "react";
import { Box } from "@material-ui/core";
import { useStyles } from "./SlideIndicator.style";

interface SlideIndicatorProps {
  length: number;
  currentIndex: number;
}

export const SlideIndicator: React.FC<SlideIndicatorProps> = ({
  length,
  currentIndex,
}) => {
  const styles = useStyles();

  const getClassName = (indicatorIndex: number) => {
    return currentIndex === indicatorIndex
      ? `${styles.indicator} ${styles.active}`
      : styles.indicator;
  };

  return (
    <Box display="flex" margin="16px auto">
      {Array(length)
        .fill(undefined)
        .map((_, i) => (
          <Box className={getClassName(i)} key={i}></Box>
        ))}
    </Box>
  );
};
