import React from "react";
import { useHistory } from "react-router-dom";
import { ConfigContext } from "_config";
import { HelpView } from "./Help.view";

export const Help: React.FC = () => {
  const { company } = React.useContext(ConfigContext);
  const history = useHistory();

  const onCancelButtonClick = () => {
    history.goBack();
  };

  const zenDeskRedirect = () => {
    window.open(company.linkHelp);
  };

  return (
    <HelpView
      company={company}
      onCancelButtonClick={onCancelButtonClick}
      zenDeskRedirect={zenDeskRedirect}
    />
  );
};
