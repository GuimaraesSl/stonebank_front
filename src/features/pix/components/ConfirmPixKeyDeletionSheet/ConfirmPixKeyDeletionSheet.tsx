import React from "react";
import { StoreState } from "redux/state";
import { useSelector } from "react-redux";
import { useStyles } from "./ConfirmPixKeyDeletionSheet.style";
import { maskKeys } from "features/pix/_utils/masks/maskKeys";
import { Icon } from "components/Icon";
import { Button, ButtonWithFloatingIcon, PageContainer } from "components";
import {
  Box,
  Drawer,
  Grid,
  Typography,
  Button as MuiButton,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

interface ConfirmPixKeyDeletionSheetProps {
  open: boolean;
  onClose: VoidFunction;
  onConfirmPixKeyDeletion: VoidFunction;
}

export const ConfirmPixKeyDeletionSheet: React.FC<
  ConfirmPixKeyDeletionSheetProps
> = ({ open, onClose, onConfirmPixKeyDeletion }) => {
  const style = useStyles();

  const { pixKey } = useSelector((state: StoreState) => state.pix);

  return (
    <React.Fragment>
      <Drawer
        className={style.drawer}
        anchor="bottom"
        elevation={0}
        open={open}
        onClose={onClose}
      >
        <PageContainer>
          <Box className={style.content} data-test-id="withfloating-button">
            <Box className={style.closeButton}>
              <Button
                size="small"
                palette="secondary"
                onClick={onClose}
                startIcon={<Close color="primary" />}
                data-test-id="close-button"
              >
                Fechar
              </Button>
            </Box>
            <Grid container direction="column" spacing={4}>
              <Grid
                item
                className={style.text}
                data-test-id="withfloating-description"
              >
                <Typography variant="h6" gutterBottom>
                  Excluir Chave
                </Typography>
                <Typography variant="h6" className={style.subtitle}>
                  Deseja realmente apagar a chave
                </Typography>
                <Typography variant="h6">
                  {maskKeys(pixKey?.pixKeyValue!, pixKey?.pixKeyType!)}?
                </Typography>
              </Grid>

              <Grid item className={style.buttonsRow}>
                <Grid container justify="center" spacing={4}>
                  <Grid item>
                    <MuiButton
                      variant="contained"
                      className={style.buttonCancel}
                      onClick={onClose}
                      size={"medium"}
                      data-test-id="cancel-delete-button"
                    >
                      Cancelar
                    </MuiButton>
                  </Grid>
                  <Grid item>
                    <ButtonWithFloatingIcon
                      icon={<Icon name="confirm" />}
                      onClick={onConfirmPixKeyDeletion}
                      className={style.deleteButton}
                    >
                      Excluir
                    </ButtonWithFloatingIcon>
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
