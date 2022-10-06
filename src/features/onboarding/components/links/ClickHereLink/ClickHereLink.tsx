import { Link, Typography } from "@material-ui/core";
import React from "react";
import { useStyle } from "./ClickHereLink.style";

export const ClickHereLink = () => {
  const style = useStyle();
  return (
    <Typography className={style.clickHereLink} variant="caption" align="left">
      <Link data-test-id="click-here" className={style.clickHere}>
        Clique aqui
      </Link>
      &nbsp;para conhecer mais sobre o OpenBank
    </Typography>
  );
};
