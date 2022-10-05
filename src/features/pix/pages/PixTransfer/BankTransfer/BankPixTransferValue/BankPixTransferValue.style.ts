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
  transferValue: {
    marginTop: "8px",
    fontWeight: 700,
    alignContent: "center",
    flexDirection: "column",
    color: colors.source.neutral,
    "& .MuiTypography-root": {
      fontWeight: "inherit",
    },
  },
  scheduleButton: {
    display: "flex",
    marginTop: "16px",
    justifyContent: "center",
  },
  payeeSection: {
    "& #payee-info-card": {
      margin: "0 -16px",
      marginTop: "8px",
    },
  },
  description: {
    fontSize: "0.75rem",
    fontWeight: 500,
  },
  footer: { display: "flex", justifyContent: "space-between" },
});
