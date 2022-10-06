import React from "react";
import { Box } from "@material-ui/core";
import { useStyles } from "./ThirdSlide.style";
import { SlideContent } from "../SlideContent";
import { Icon } from "components/Icon";

export const ThirdSlide: React.FC = () => {
  const styles = useStyles();

  return (
    <SlideContent>
      <Box display="flex" justifyContent="center" paddingTop="80px">
        <Icon name={"pixWelcomeKeys"} className={styles.image} />
      </Box>
      Em poucos passos, você envia ou recebe dinheiro digitamente para qualquer
      pessoa ou empresa que também esteja no Pix. Entre pessoas físicas essas
      transações não tem custo.
    </SlideContent>
  );
};
