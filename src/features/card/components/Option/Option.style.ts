import { makeStyles } from "@material-ui/core";
import { colors } from "_config/theme";

export const useStyles = makeStyles({
  buttonOption: {
    width: "100%",
    borderRadius: 0,
    padding: 0,
    height: "80px",
    "& .MuiButton-label": {
      height: "80px",
      fontFamily: "Roboto",
    },
    boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.24)",
  },
  subtitle: {
    fontWeight: 500,
    fontSize: 13,
    fontFamily: "Roboto",
    lineHeight: "15.23px",
    color: colors.neutral.shade40,
    "& + #pd-description": {
      marginTop: 8,
    },
    margin: "0 0 3px 0",
  },
  description: {
    color: colors.neutral.shade40,
    fontWeight: 300,
    fontSize: 12,
    height: "27px",
    fontFamily: "Roboto",
    lineHeight: "14.06px",
    textAlign: "left",
    letterSpacing: 0,
  },
  contentContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    margin: "15px 26px 16px 26px",
    alignItems: "center",
  },
  labelContainer: {
    textTransform: "none",
    textAlign: "left",
    width: "72.766%",
  },
});
