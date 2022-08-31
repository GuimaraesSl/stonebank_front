import { makeStyles } from "@material-ui/core";
import { colors } from "_config/theme";

export const useStyles = makeStyles({
  txtaddress: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 18,
    textAlign: "center",
    color: colors.neutral.shade40,
    marginTop: "-15px",
  },
  card: {
    width: "100%",
    height: 176,
  },
  box: {
    width: 265,
    color: colors.neutral.shade40,
    textAlign: "center",
    paddingTop: 20,
    fontWeight: 300,
  },
  img: {
    marginTop: "-85px",
    width: 156.88,
    height: 156,
  },
  contentimg: {
    display: "flex",
    justifyContent: "center",
  },
  contentTexts: {
    justifyContent: "center",
  },
  textmid: {
    display: "flex",
    justifyContent: "center",
  },
});
