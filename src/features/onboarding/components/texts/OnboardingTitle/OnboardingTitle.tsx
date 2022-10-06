import React from "react";
import { Typography } from "@material-ui/core";
import { ConfigContext } from "_config";
import { useStyles } from "./OnboardingTile.style";

export const OnboardingTitle: React.FC = () => {
  const { company } = React.useContext(ConfigContext);
  const styles = useStyles();

  return (
    <Typography
      className={styles.title}
      data-test-id="welcome-title"
    >
      Vamos Começar
    </Typography>
  );
};
