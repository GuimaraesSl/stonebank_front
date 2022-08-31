import React from "react";
import { Typography } from "@material-ui/core";
import { useStyles } from "./SlideBottomText.style";

export const SlideBottomText: React.FC = ({ children }) => {
  const styles = useStyles();

  return (
    <Typography align="center" className={styles.text}>
      {children}
    </Typography>
  );
};
