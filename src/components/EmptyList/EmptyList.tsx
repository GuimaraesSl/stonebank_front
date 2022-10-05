import React from "react";
import { Box } from "@material-ui/core";
import { useStyles } from "./EmptyList.style";
import { Icon } from "components/Icon";

export const EmptyList: React.FC = () => {
  const styles = useStyles();

  return (
    <Box className={styles.container} data-test-id="empty-list">
      <Icon name={"emptyListImage"} className={styles.container} />
      <p>
        <strong>Nada aqui!</strong>
      </p>
      <span>Nenhum item encontrado.</span>
    </Box>
  );
};
