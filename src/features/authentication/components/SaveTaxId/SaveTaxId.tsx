import {
  Box,
  List,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { useStyles } from "./SaveTaxId.style";

interface ButtonProps {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  save?: React.ReactNode;
}

export const SaveTaxId: React.FC<ButtonProps> = ({ text, onClick, save }) => {
  const styles = useStyles();

  return (
    <List disablePadding={true}>
      <Box onClick={onClick}>
        <ListItemText className={styles.ListItemText}>
          {text}
          <ListItemSecondaryAction className={styles.listItemSecondaryAction}>
            {save}
          </ListItemSecondaryAction>
        </ListItemText>
      </Box>
    </List>
  );
};
