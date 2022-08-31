import { makeStyles } from "@material-ui/core";
import { colors } from "_config";

export const useStyles = makeStyles({
  box: {
    backgroundColor: colors.neutral.shade10,
    color: colors.neutral.shade50,
    margin: "0 36px",
    padding: "8px 32px",
  },
  text: {
    color: colors.neutral.shade50,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "14px",
    textAlign: "center",
  },
});
