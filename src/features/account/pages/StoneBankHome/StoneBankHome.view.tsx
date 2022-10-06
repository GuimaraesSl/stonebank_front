import { Box, Container, Grid, Typography } from "@material-ui/core";
import { GitHub, PlusOne, WhatsApp } from "@material-ui/icons";
import { PageContainer } from "components";
import { Icon } from "components/Icon";
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
        <Grid container style={{ padding: '7px 30px', justifyContent: 'space-between', flexDirection: 'row' }}>
          <Grid container style={{ flexDirection: 'column', width: '70px' }}>
            <Grid item className={styles.functions}>
              <Icon name="pixImage" />
            </Grid>
            <Typography className={styles.functionName}>
              {'Área pix'}
            </Typography>
          </Grid>
          <Grid container style={{ flexDirection: 'column', width: '70px' }}>
            <Grid item className={styles.functions}>
              <Icon name="invest" />
            </Grid>
            <Typography className={styles.functionName}>
              {'Investimento'}
            </Typography>
          </Grid>
          <Grid container style={{ flexDirection: 'column', width: '70px' }}>
            <Grid item className={styles.functions}>
              <PlusOne fontSize="large" className={styles.functionIcon} />
            </Grid>
            <Typography className={styles.functionName}>
              {''}
            </Typography>
          </Grid>
          <Grid container style={{ flexDirection: 'column', width: '70px' }}>
            <Grid item className={styles.functions}>
              <PlusOne fontSize="large" className={styles.functionIcon} />
            </Grid>
            <Typography className={styles.functionName}>
              {''}
            </Typography>
          </Grid>
        </Grid>
        <Box style={{ padding: '5px 0px', marginTop: '10px', borderRadius: '8px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
          <Box style={{ textAlign: 'center', color: '#000' }}>
            <Typography>{'Serviços'}</Typography>
            <Grid container style={{ padding: '7px 30px', justifyContent: 'space-between', flexDirection: 'row' }}>
              <Grid container style={{ flexDirection: 'column', width: '75px' }}>
                <Grid item className={styles.functions2}>
                  <Icon name="smartphone"/>
                </Grid>
                <Typography className={styles.functionName}>
                  {'Recarga'}
                </Typography>
              </Grid>
              <Grid container style={{ flexDirection: 'column', width: '75px' }}>
                <Grid item className={styles.functions2}>
                  <Icon name="card"/>
                </Grid>
                <Typography className={styles.functionName}>
                  {'Meus cartões'}
                </Typography>
              </Grid>
              <Grid container style={{ flexDirection: 'column', width: '75px' }}>
                <Grid item className={styles.functions2}>
                  <Icon name="transf"/>
                </Grid>
                <Typography className={styles.functionName}>
                  {'Transferência'}
                </Typography>
              </Grid>
            </Grid>
            <Grid container style={{ padding: '7px 30px', justifyContent: 'space-between', flexDirection: 'row' }}>
              <Grid container style={{ flexDirection: 'column', width: '75px' }}>
                <Grid item className={styles.functions2}>
                  <PlusOne fontSize="large" className={styles.functionIcon} />
                </Grid>
                <Typography className={styles.functionName}>
                  {''}
                </Typography>
              </Grid>
              <Grid container style={{ flexDirection: 'column', width: '75px' }}>
                <Grid item className={styles.functions2}>
                  <PlusOne fontSize="large" className={styles.functionIcon} />
                </Grid>
                <Typography className={styles.functionName}>
                  {''}
                </Typography>
              </Grid>
              <Grid container style={{ flexDirection: 'column', width: '75px' }}>
                <Grid item className={styles.functions2}>
                  <PlusOne fontSize="large" className={styles.functionIcon} />
                </Grid>
                <Typography className={styles.functionName}>
                  {''}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box style={{ padding: '5px 15px', marginTop: '30px', backgroundColor: '#D9D9D9', borderRadius: '8px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', height: '101px' }}>
          <Grid container justifyContent='center' style={{ flexDirection: 'row' }}>
            <Typography style={{ color: '#000', textAlign: 'center', fontSize: '13px', width: '100%' }}>
              {'Cartão de Crédito'}
            </Typography>
            <Grid container style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
              <Grid item style={{ flexDirection: 'row' }}>
                <Typography style={{ color: '#000', textAlign: 'left', fontSize: '12px' }}>
                  {'Fatura atual'}
                </Typography>
                <Typography style={{ color: '#000', textAlign: 'left', fontSize: '20px' }}>
                  {'R$ 700,00'}
                </Typography>
                <Typography style={{ color: '#000', textAlign: 'left', fontSize: '12px' }}>
                  {'Limite disponível: R$ 300,00'}
                </Typography>
              </Grid>
              <Grid item style={{ margin: '0', alignSelf: 'center' }}>
                <Icon name="arrowRight2"/>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </PageContainer>
  );
};
