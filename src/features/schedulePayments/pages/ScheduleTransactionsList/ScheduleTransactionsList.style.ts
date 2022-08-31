import { makeStyles } from "@material-ui/core";
import { colors } from "_config/theme";

export const useStyles = makeStyles({
  containerTransaction: {
    marginTop: "-16px",
    margin: "0 -16px",
    paddingBottom: "67px",
  },
  filterContainer: {
    display: "grid",
    marginTop: "15px",
    position: "relative",
    marginBottom: "-10px",
    gridTemplateColumns: "0fr 1fr 0fr",
  },
  filterDates: {
    width: "max-content",
    display: "flex",
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: "14px",
    alignItems: "center",
    color: colors.system.light.primary,
  },
  divider: {
    marginTop: "10px",
    marginRight: "12px",
    marginLeft: "4px",
  },
  buttonFilter: {
    display: "flex",
    alignItems: "right",
  },
});
