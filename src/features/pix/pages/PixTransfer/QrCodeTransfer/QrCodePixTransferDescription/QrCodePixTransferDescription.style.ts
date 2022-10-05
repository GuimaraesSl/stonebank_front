import { makeStyles } from "@material-ui/core";
import { colors } from "_config";

export const useStyles = makeStyles({
  buttonTagFloating: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
  },
  importantWarning: {
    marginTop: "30px",
  },
  alertMessage: {
    fontSize: 15,
    marginTop: 10,
    color: colors.source.neutral,
    fontWeight: 300,
    lineHeight: "130%",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
  },
});
