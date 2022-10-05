import { makeStyles } from "@material-ui/core";
import { colors, theme } from "_config/theme";

export const useStyles = makeStyles({
  recentFavored: {
    "& button": {
      top: "0",
      height: "50px",
      width: "120px",
      borderRadius: "6px",
      border: `1px solid ${colors.neutral.shade30}`,
      boxShadow: `0px 2px 4px 0px ${colors.readOnly.light.black}40`,
      padding: 0,
      color: colors.neutral.shade40,
      display: "block",
      "& .expressionsWrapper": {
        marginTop: "3px",
        display: "block",
        lineHeight: "1.2",
        marginLeft: "8px",
        "& .name": {
          fontSize: "11px",
          padding: "0 0 4px",
          fontStyle: "normal",
          letterSpacing: "0em",
          textAlign: "left",
          display: "block",
        },
        "& .bankName": {
          fontSize: "11px",
          fontStyle: "normal",
          letterSpacing: "0em",
          textAlign: "left",
          display: "block",
        },
      },
    },
  },
});
