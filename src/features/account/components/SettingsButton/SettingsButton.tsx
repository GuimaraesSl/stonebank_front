import React from "react";
import { useHistory } from "react-router-dom";
import { AccountRoutes } from "features/account/constants/routes";
import { settingsLabel } from "constants/buttons/labels";
import { ButtonWithFloatingIcon } from "components/ButtonWithFloatingIcon";
import { Icon } from "components/Icon";

export const SettingsButton: React.FC = () => {
  const history = useHistory();

  const onClick = () => history.push(AccountRoutes.settings);

  return (
    <ButtonWithFloatingIcon
      icon={<Icon name={"settingIcon"} />}
      iconAlt={settingsLabel}
      onClick={onClick}
      data-test-id="settings-button"
    >
      {settingsLabel}
    </ButtonWithFloatingIcon>
  );
};
