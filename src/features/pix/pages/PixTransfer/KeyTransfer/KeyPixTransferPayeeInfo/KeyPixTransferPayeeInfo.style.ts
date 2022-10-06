import { makeStyles } from "@material-ui/core";
import { colors } from "_config";

export const useStyles = makeStyles({
  page: {
    "& main": {
      paddingTop: 48,
    },
  },

  payeeInfo: {
    color: colors.neutral.shade40,
    textAlign: "center",

    "& h6": {
      fontSize: "1.125rem",
      fontWeight: 500,
      marginBottom: 20,
    },
  },
  footer: { display: "flex", justifyContent: "space-between" },
});
