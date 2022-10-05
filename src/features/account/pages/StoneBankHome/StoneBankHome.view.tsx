import { Box, Container, Grid, Typography } from "@material-ui/core";
import { GitHub, PlusOne, WhatsApp } from "@material-ui/icons";
import { PageContainer } from "components";
import { StoneBankHomePageHeader } from "features/account/components/StoneBankHomePageHeader";
import { useStyles } from "./StoneBankHome.style";

export const StoneBankHomeView: React.FC = () => {
  const styles = useStyles();

  return (
    <PageContainer className={styles.pageContainer}>
      <StoneBankHomePageHeader className={styles.header} />
      <Box style={{ padding: '5px 15px' }}>
        <Typography className={styles.title}>
          {'Favoritos'}
        </Typography>
        <Grid container style={{ padding: '7px 40px', justifyContent: 'space-between' }}>
          <Grid item className={styles.functions}>
            <WhatsApp fontSize="large" className={styles.functionIcon} />
          </Grid>
          <Grid item className={styles.functions}>
            <GitHub fontSize="large" className={styles.functionIcon} />
          </Grid>
          <Grid item className={styles.functions}>
            <PlusOne fontSize="large" className={styles.functionIcon} />
          </Grid>
          <Grid item className={styles.functions}>
            <PlusOne fontSize="large" className={styles.functionIcon} />
          </Grid>
        </Grid>
        <Box style={{ padding: '5px 15px', marginTop: '10px', borderRadius: '8px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
          <Box style={{ textAlign: 'center' }}>
            <Typography>{'Serviços'}</Typography>
          </Box>
        </Box>
      </Box>
    </PageContainer>
  );
};
