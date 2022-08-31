import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "./EmptyListMessage.style";

export const EmptyListMessage: React.FC = () => {
  const styles = useStyles();

  return (
    <Box className={styles.box}>
      <Typography className={styles.text}>
        Você ainda não registrou nenhuma chave nessa conta
      </Typography>
    </Box>
  );
};
