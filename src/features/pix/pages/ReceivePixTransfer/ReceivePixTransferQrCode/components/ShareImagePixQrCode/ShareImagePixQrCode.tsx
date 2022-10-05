import React from "react";
import { Box, Drawer, Grid, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Button } from "components/Button";
import { PageContainer } from "components/PageContainer";
import { useStyles } from "./ShareImagePixQrCode.style";
import { useSelector } from "react-redux";
import { StoreState } from "redux/state";
import { ButtonWithFloatingIcon } from "components";

interface ShareImagePixQrCodeProps {
  open: boolean;
  onClose: Function | ((ShareImagePixQrCodeValid: boolean) => void);
}

export const ShareImagePixQrCode: React.FC<ShareImagePixQrCodeProps> = ({
  open,
  onClose,
}) => {
  const styles = useStyles();

  const { staticPixQrCode } = useSelector((state: StoreState) => state.pix);

  const accountName = useSelector(
    (store: StoreState) => store.account.account?.name
  );

  const onCloseButtonClick = () => {
    onClose(false);
  };

  const showShareButton =
    (window as any).flutter_inappwebview || navigator.share;

  const onShareQrCode = async () => {
    const webview = (window as any).flutter_inappwebview;
    const base64url = `data:image/png;base64,${staticPixQrCode?.qrCode}`;
    const blob = await (await fetch(base64url)).blob();
    const file = new File([blob], "qrCode.png", { type: blob.type });

    if (webview)
      return webview.callHandler("onShareTransactionReceipt", base64url);

    navigator.share({
      title: "Compartilhar QrCode",
      files: [file],
    });
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
                  Cobrança PIX com QR Code
                </Typography>
                <Grid item className={styles.qrCodeWrapper}>
                  <Typography variant="subtitle1" className={styles.name}>
                    {accountName}
                  </Typography>
                  <img
                    className={styles.qrCode}
                    src={`data:image/png;base64,${staticPixQrCode?.qrCode}`}
                    alt="qr code"
                  />
                  <Grid className={styles.shareButton}>
                    {showShareButton && (
                      <ButtonWithFloatingIcon
                        data-test-id="share-button"
                        size="large"
                        onClick={onShareQrCode}
                      >
                        Compartilhar
                      </ButtonWithFloatingIcon>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </PageContainer>
      </Drawer>
    </React.Fragment>
  );
};
