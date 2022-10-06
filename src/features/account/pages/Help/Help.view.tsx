import React from "react";
import { AppBar } from "components/AppBar";
import { PageContainer } from "components/PageContainer";
import { ProcessPageLayout } from "components/ProcessPageLayout";
import { Button } from "components/Button";
import { Close } from "@material-ui/icons";
import { cancelLabel } from "constants/buttons/labels";
import { Box, Grid, Link, Typography } from "@material-ui/core";
import { useStyles } from "./Help.style";
import { ProcessPageFooter } from "components/ProcessPageFooter";
import { AccountRoutes } from "features/account/constants/routes";
import { ProcessDescriptionHeader } from "components/ProcessDescriptionHeader";
import { ActionList } from "components/ActionList";
import { ListItemHelp } from "features/account/components/ListItemHelp";
import { Icon } from "components/Icon";
import { Company } from "_config/application";

interface HelpViewProps {
  company: Company;
  onCancelButtonClick: VoidFunction;
  zenDeskRedirect: VoidFunction;
}

export const HelpView: React.FC<HelpViewProps> = ({
  company,
  onCancelButtonClick,
  zenDeskRedirect,
}) => {
  const styles = useStyles();
  return (
    <Box className={styles.mainContainer}>
      <PageContainer>
        <ProcessPageLayout
          appBar={
            <AppBar
              homeRoute={AccountRoutes.home}
              action={
                <Button
                  palette="secondary"
                  size="small"
                  startIcon={<Close color="primary" />}
                  onClick={onCancelButtonClick}
                  data-test-id="cancel-button"
                >
                  {cancelLabel}
                </Button>
              }
            />
          }
          header={
            <Box className={styles.header}>
              <ProcessDescriptionHeader
                title="Ajuda"
                subtitle="Ficou alguma dúvida?"
                description="Entre em contato com a gente que em breve lhe retornaremos"
              />
            </Box>
          }
          main={
            <Box className={styles.content}>
              <Grid>
                <Box className={styles.doubtButtonContainer}>
                  {company.linkHelp && (
                    <Button
                      onClick={() => {
                        zenDeskRedirect();
                      }}
                      palette="secondary"
                      data-test-id="help-button"
                    >
                      <Box className="internButtonBox">
                        <Box className="balloonAndLabelBox">
                          <Icon name="doubleBalloon" />
                          <Box className="doubtLabelBox">
                            <Typography className="titleLabel">
                              {" "}
                              Envie sua dúvida{" "}
                            </Typography>
                          </Box>
                        </Box>
                        <Icon name="externArrowLink" />
                      </Box>
                    </Button>
                  )}
                </Box>
                <ActionList className={styles.actionList}>
                  {company.address && (
                    <ListItemHelp
                      title={"Endereço"}
                      details={company.address}
                      icon={<Icon name="address" />}
                    />
                  )}
                  {company.phone && (
                    <ListItemHelp
                      title={"Telefone"}
                      details={company.phone}
                      icon={<Icon name="phoneHelp" />}
                    />
                  )}
                  {company.email && (
                    <ListItemHelp
                      title={"E-mail"}
                      details={company.email}
                      icon={<Icon name="mail" />}
                    />
                  )}
                  {company.website && (
                    <ListItemHelp
                      title={"Canal no YouTube ou site"}
                      details={company.website}
                      icon={<Icon name="website" />}
                    />
                  )}
                </ActionList>
              </Grid>
              <Grid className={styles.textBottom}>
                <Typography className={styles.text}>
                  Caso sua dúvida não seja sanada, você pode registrar uma
                  reclamação no site do{" "}
                  <Link
                    className={styles.link}
                    href="https://www.bcb.gov.br/acessoinformacao/registrar_reclamacao"
                  >
                    Banco Central do Brasil
                  </Link>
                </Typography>
              </Grid>
            </Box>
          }
          footer={<ProcessPageFooter />}
        />
      </PageContainer>
    </Box>
  );
};
