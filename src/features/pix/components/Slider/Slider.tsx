import { Box, Typography } from "@material-ui/core";
import React from "react";
import { CurrencyFormatter } from "_translate";
import { useStyles } from "./Slider.style";

interface SliderProps {
  maxValue: number;
  minValue: number;
  step?: number;
  value: number;
  onValueChange: (value: string) => void;
}

export const Slider: React.FC<SliderProps> = ({
  maxValue,
  minValue,
  step,
  value,
  onValueChange,
}) => {
  const unavailablePercentage = React.useMemo(() => {
    return (minValue / maxValue) * 100;
  }, [minValue, maxValue]);

  const availablePercentage = React.useMemo(() => {
    return 100 - unavailablePercentage;
  }, [unavailablePercentage]);

  const styles = useStyles({
    availableTrackSizePercentage: availablePercentage,
    minValue: minValue,
  });

  const columns = React.useMemo(() => {
    if (minValue === 0) return "1fr";
    return `${unavailablePercentage}% ${availablePercentage}%`;
  }, [availablePercentage, minValue, unavailablePercentage]);

  return (
    <Box>
      <Box className={styles.labels}>
        <Typography>{CurrencyFormatter.format(minValue)}</Typography>
        <Typography>{CurrencyFormatter.format(maxValue)}</Typography>
      </Box>
      <Box position="relative">
        <Box gridTemplateColumns={columns} className={styles.track}>
          {minValue > 0 && <Box id="unavailable" />}
          <Box id="available" />
        </Box>
        <Box className={styles.inputWrapper}>
          <input
            id="limit-value"
            className={styles.input}
            type="range"
            max={maxValue}
            min={minValue}
            step={step}
            value={value}
            onChange={(event) => {
              onValueChange(String((Number(event.currentTarget.value)*100)))
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
