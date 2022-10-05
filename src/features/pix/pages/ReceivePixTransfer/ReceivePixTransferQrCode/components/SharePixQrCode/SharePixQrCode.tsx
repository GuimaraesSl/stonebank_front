import React from "react";
import { Box, Drawer, Grid, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Button } from "components/Button";
import { PageContainer } from "components/PageContainer";
import { useStyles } from "./SharePixQrCode.style";
import qrCode from "_assets/icons/iconQrCodeButton.svg";
import { ShareCode } from "../ShareCode";
import { ShareImagePixQrCode } from "../ShareImagePixQrCode";
import { Icon } from "components/Icon";
import { SelectionButton } from "features/pix/components/SelectionButton";

interface SharePixQrCodeProps {
  open: boolean;
  onClose: Function | ((SharePixQrCodeValid: boolean) => void);
}

export const SharePixQrCode: React.FC<SharePixQrCodeProps> = ({
  open,
  onClose,
}) => {
  const styles = useStyles();

  const onCloseButtonClick = () => {
    onClose(false);
  };

  const [onShareCodePixQRCode, setShareCodePixQRCode] = React.useState(false);
  const [validatedShareCodePixQRCodeSheet, setShareCodePixQRCodeSheet] =
    React.useState(false);

  const onShareCodePixQRCodeClick = React.useCallback(() => {
    setShareCodePixQRCode(true);
  }, []);

  const onShareCodePixQRCodeClose = (ShareCodePixQRCodeValid: boolean) => {
    if (ShareCodePixQRCodeValid) setShareCodePixQRCodeSheet(true);
    setShareCodePixQRCode(false);
  };

  const [onShareImagePixQrCode, setShareImagePixQrCode] = React.useState(false);
  const [validatedShareImagePixQrCodeSheet, setShareImagePixQrCodeSheet] =
    React.useState(false);

  const onShareImagePixQrCodeClick = React.useCallback(() => {
    setShareImagePixQrCode(true);
  }, []);

  const onShareImagePixQrCodeClose = (ShareImagePixQrCodeValid: boolean) => {
    if (ShareImagePixQrCodeValid) setShareImagePixQrCodeSheet(true);
    setShareImagePixQrCode(false);
  };

  return (
    <React.Fragment>
      <Drawer
        className={styles.drawer}
        anchor="bottom"
        elevation={0}
        open={open}
        onClose={() => onClose(false)}
      >
        <PageContainer>
          <Box className={styles.content}>
            <Box className={styles.closeButton}>
              <Button
                size="small"
                palette="secondary"
                onClick={onCloseButtonClick}
                startIcon={<Close color="inherit" />}
              >
                Fechar
              </Button>
            </Box>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <Typography variant="h6" gutterBottom className={styles.title}>
                  Como deseja compartilhar?
                </Typography>
                <Box className={styles.receiverSection}>
                  <SelectionButton
                    id="receiver-info-card"
                    qrCodeButton="Código do QR Code"
                    startIcon={<Icon name="qrCodeCodigo" />}
                    onClick={onShareCodePixQRCodeClick}
                  />
                  <SelectionButton
                    id="receiver-info-card"
                    qrCodeButton="Imagem  QR Code"
                    startIcon={<Icon name="qrCodeButton" />}
                    onClick={onShareImagePixQrCodeClick}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <ShareCode
            open={onShareCodePixQRCode}
            onClose={onShareCodePixQRCodeClose}
          />
          <ShareImagePixQrCode
            open={onShareImagePixQrCode}
            onClose={onShareImagePixQrCodeClose}
          />
        </PageContainer>
      </Drawer>
    </React.Fragment>
  );
};
