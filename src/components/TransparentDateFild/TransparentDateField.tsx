import React from "react";
import { TextField as MuiTextField, Typography } from "@material-ui/core";
import { useStyles } from "./TransparentDateField.style";

interface TransparentDateFieldProps {
  type?: "number" | "email" | "password" | "date";
  variant?: "outlined" | "filled";
  multiline?: boolean;
  error?: boolean;
  rows?: string;
  helperText?: string;
  placeholder?: string;
  label?: string;
  value: string;
  select?: boolean;
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  minValue?: number | Date;
  maxValue?: number;
  disabled?: boolean;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TransparentDateField: React.FC<TransparentDateFieldProps> = ({
  type,
  variant,
  multiline,
  error,
  rows,
  helperText,
  placeholder,
  label,
  value,
  select,
  inputMode,
  startAdornment,
  endAdornment,
  minValue,
  maxValue,
  disabled,
  required,
  children,
  onChange,
}) => {
  const styles = useStyles({ variant: variant ?? "outlined" });

  return (
    <React.Fragment>
      <Typography className={styles.label}>{label}</Typography>
    <MuiTextField
      multiline={multiline}
      rows={rows}
      type={type}
      error={error}
      color="primary"
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      select={select}
      helperText={helperText}
      inputMode={inputMode}
      className={error === true ? styles.TransparentDateFieldError : styles.TransparentDateField}
      InputProps={{
        startAdornment,
        endAdornment,
      }}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        step: type === "number" ? 0.1 : undefined,
        min: minValue,
        max: maxValue,
        inputMode,
      }}
      fullWidth
      required={required}
      onChange={onChange}
    >
      {children}
    </MuiTextField>
    </React.Fragment>
  );
};
