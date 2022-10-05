import { makeStyles } from "@material-ui/core";
import { colors } from "_config";

export const useStyles = makeStyles({
  page: {
    "& main": {
      color: colors.neutral.shade40,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
  },
  header: {
    marginTop: "8px",
    fontWeight: 700,
    alignContent: "center",
    color: colors.source.neutral,
    "& .MuiTypography-root": {
      fontWeight: "inherit",
    },
  },
  scheduleButton: {
    display: "flex",
    justifyContent: "center",
    marginTop: "16px",
  },
  payeeSection: {
    "& #payee-info-card": {
      margin: "0 -16px",
      marginTop: "8px",
    },
  },
  text: {
    fontSize: "0.75rem",
    fontWeight: 500,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
  },
});
