import React from "react";
import { InputAdornment, TextField } from "@material-ui/core";
import { useStyles } from "./SearchField.styles";
import { Icon } from "components/Icon";

interface SearchFieldProps {
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  placeholder,
  onChange,
}) => {
  const style = useStyles();

  return (
    <TextField
      className={style.search}
      variant="outlined"
      size="small"
      placeholder={placeholder}
      fullWidth
      onChange={onChange}
      data-test-id="search-field"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon name="search" />
          </InputAdornment>
        ),
      }}
    />
  );
};
