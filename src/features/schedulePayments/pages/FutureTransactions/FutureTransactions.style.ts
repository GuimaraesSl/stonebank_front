import { makeStyles } from "@material-ui/core";
import { colors } from "_config/theme";

export const useStyles = makeStyles({
  filters: {
    display: "flex",
    marginTop: "10px",
    marginBottom: "-25px",
    flexdirection: "row",
    color: colors.neutral.shade30,
  },
  searchField: {
    marginBottom: 16,
  },
  container: {
    width: "55%",
    marginBottom: "12.88px",
  },
  containerTransaction: {
    marginTop: "-16px",
    margin: "0 -16px",
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
    marginRight: "20px",
    marginLeft: "10px",
  },
  buttonFilter: {
    display: "flex",
    alignItems: "right",
  },
});
