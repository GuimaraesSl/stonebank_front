/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@material-ui/core";
import { Button } from "components";
import { KeyType } from "features/pix/redux/models/keyType";
import React from "react";
import { useStyles } from "./PixKeyTypeButtonList.style";

interface PixKeyTypeButtonListViewProps {
  selectedKeyType: KeyType;
  setKeyType: (_: KeyType) => void;
}

export const PixKeyTypeButtonListView: React.FC<
  PixKeyTypeButtonListViewProps
> = ({ selectedKeyType, setKeyType }) => {
  const styles = useStyles();

  const mapKeyTypeToButton = React.useCallback(
    (key: KeyType) => {
      const isActive = selectedKeyType.value === key.value;

      return (
        <Button
          key={key.value}
          size="small"
          variant={isActive ? "contained" : "outlined"}
          //className={styles.button}
          onClick={() => setKeyType(key)}
          data-test-id="typekey-pix"
        >
          {key.displayString}
        </Button>
      );
    },
    [selectedKeyType]
  );

  const buttons = React.useMemo(() => {
    return KeyType.values.map(mapKeyTypeToButton);
  }, [selectedKeyType]);

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(4, 1fr)"
      gridColumnGap={4}
      height={36}
    >
      {buttons}
    </Box>
  );
};
