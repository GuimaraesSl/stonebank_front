import React from "react";
import { useStyles } from "./CancellationReplacementCard.style";
import { Box } from "@material-ui/core";
import { PageContainer } from "components/PageContainer";
import { ProcessPageLayout } from "components/ProcessPageLayout";
import { AppBar } from "components/AppBar";
import { ProcessDescriptionHeader } from "components/ProcessDescriptionHeader";
import { ProcessPageFooter } from "components/ProcessPageFooter/ProcessPageFooter";
import { Option } from "features/card/components/Option";
import { useHistory } from "react-router-dom";
import { CardRoutes } from "features/card/constants/routes";
import { AccountRoutes } from "features/account/constants/routes";
import { Icon } from "components/Icon";

export const CancellationReplacementCard: React.FC = () => {
  const history = useHistory();
  const styles = useStyles();

  const onCancelCard = () => history.push(CardRoutes.cancelWarning);

  const onReplacementCard = () => history.push(CardRoutes.reissueReason);

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={<AppBar homeRoute={AccountRoutes.home} />}
        header={
          <Box className={styles.headerWrapper}>
            <ProcessDescriptionHeader
              title={"Cancelamento e segunda via"}
              subtitle={"Aconteceu algo com seu cartão? "}
              description={"Cancelamento definitivo de seu cartão"}
            />
          </Box>
        }
        main={
          <Box className={styles.containerOption}>
            <Option
              title={"Cancelar o cartão"}
              description={
                "Esta ação é definitiva e não gera segunda via do cartão"
              }
              icon={
                <Icon
                  name="cancelIconCard"
                  className={styles.cancelCardIconDimension}
                />
              }
              type="standard"
              onClick={onCancelCard}
              data-test-id="cancel-card-button"
            />
            <Option
              title={"Cancelar e solicitar 2ª Via"}
              description={"Em caso de perda, roubo ou substituição do cartão"}
              icon={
                <Icon
                  name="iconReplacement"
                  className={styles.replacementCardIconDimension}
                />
              }
              type="standard"
              onClick={onReplacementCard}
            />
          </Box>
        }
        footer={<ProcessPageFooter />}
      />
    </PageContainer>
  );
};
