import { makeStyles } from "@material-ui/core";
import { colors } from "_config/theme";

export const useStyles = makeStyles({
  labelstyle: {
    fontSize: "12px",
    lineHeight: "15,6px",
    fontWeight: 500,
    color: colors.system.light.neutral,

    paddingLeft: "9px",
  },
  descriptionstyle: {
    width: "80%",
  },
  mainboxchildren: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "10px",
  },
  mainboxcontent: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
