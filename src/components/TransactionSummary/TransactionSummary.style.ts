import { makeStyles } from "@material-ui/core";
import { colors } from "_config/theme";

export const useStyles = makeStyles({
  autenticationContent: {
    width: "100%",
    paddingRight: "15px",
    marginTop: "20px",
    marginBottom: "20px",
    flexDirection: "column",
    justifyContent: "center",
    color: colors.source.neutral,
    fontSize: "10px",
  },
});
