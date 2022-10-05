import {
  Box,
  Button,
  CardContent,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { Person, SearchOutlined, Visibility, VisibilityOff } from "@material-ui/icons";
import MenuIcon from '@material-ui/icons/Menu';
import { Divider } from "components/Divider";
import { useState } from "react";
import { useStyle } from "./StoneBankHomePageHeader.style";

interface HomePageHeaderProps {
  className?: string;
}

export const StoneBankHomePageHeader: React.FC<HomePageHeaderProps> = ({
  className,
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [showBalance, setShowBalance] = useState<boolean>(true);

  const styles = useStyle();

  const _getClassName = () => {
    let value = styles.mainHeader;
    if (className) value = `${value} ${className}`;
    return value;
  };

  return (
    <Box>
      <Box className={_getClassName()}>
        <Box className={styles.menuHeader}>
          <MenuIcon />
        </Box>
        <CardContent style={{ paddingBottom: '40px' }}>
          <Box className={styles.greetingsSection}>
            <Grid container spacing={1}>
              <Grid item>
                <Person />
              </Grid>
              <Grid item>
                <Typography style={{ height: "100%", marginTop: "5px" }}>
                  {`Olá, Gabriel Al-Samir!`}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box className={styles.balanceSection}>
            <Grid container style={{ flexDirection: "column", height: "100%" }}>
              <Grid item style={{ marginTop: "10px" }}>
                <Typography>{`Saldo:`}</Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Grid item>
                    <Grid container spacing={1}>
                      <Grid item>
                        <Typography
                          style={{ fontSize: "12px", marginTop: "7px" }}
                        >
                          {`R$`}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography style={{ fontSize: "20px" }}>
                          {showBalance ? `121.700,00` : `*******`}
                        </Typography>
                      </Grid>
                      <Grid item>
                        {showBalance && <Visibility
                          onClick={() => setShowBalance(!showBalance)}
                          fontSize="small"
                          style={{ marginTop: "3px", marginLeft: "10px" }}
                        />}
                        {!showBalance && <VisibilityOff
                          onClick={() => setShowBalance(!showBalance)}
                          fontSize="small"
                          style={{ marginTop: "3px", marginLeft: "10px" }}
                        />}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Button className={styles.extractButton}>
                      <Typography>{`Extrato`}</Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Box>
      <Box className={styles.searchBox}>
        <TextField
          inputMode="search"
          placeholder="Pesquisar"
          value={searchText}
          variant={"outlined"}
          size={"small"}
          onChange={({ target: { value } }) => {
            setSearchText(value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
          className={styles.searchField}
        />
      </Box>
    </Box>
  );
};
