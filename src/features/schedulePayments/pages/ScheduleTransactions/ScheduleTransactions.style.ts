import { makeStyles } from "@material-ui/core";
import { colors } from "_config/theme";

export const useStyles = makeStyles({
  selectionCards: {
    cursor: "pointer",
    margin: "-16px -16px",
  },
  divider: {
    height: "1.5px",
    backgroundColor: colors.neutral.shade30,
  },
});
