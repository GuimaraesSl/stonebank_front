import { makeStyles } from "@material-ui/core";
import { colors } from "_config";

export const useStyles = makeStyles({
  indicator: {
    backgroundColor: colors.system.light.primary,
    borderRadius: 4,
    height: 8,
    margin: "0 2px",
    opacity: 0.7,
    transition: "all 120ms",
    width: 8,
  },

  active: {
    opacity: 1,
    width: 16,
  },
});
