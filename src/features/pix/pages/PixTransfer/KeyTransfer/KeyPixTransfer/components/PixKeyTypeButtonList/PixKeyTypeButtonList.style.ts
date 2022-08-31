import { makeStyles } from "@material-ui/core";
import { colors, theme } from "_config";

export const useStyles = makeStyles({
  button: {
    borderColor: colors.neutral.shade20,
    padding: 8,
    "&:hover": {
      backgroundColor: theme.palette.primary,
      color: colors.readOnly.light.white,
      border: "none",
    },

    "& > span": {
      lineHeight: "14px",
    },
  },
});
