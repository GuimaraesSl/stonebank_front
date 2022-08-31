import { makeStyles, InputBase } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { colors } from "_config/theme";

export const useStyles = makeStyles({
  formControl: {
    width: "100%",
    marginTop: "20px",
  },
  inputIdCard: {
    display: "flex",
    justifyContent: "center",
    "& input": {
      width: "89.588%",
      height: "100%",
      fontFamily: "Roboto",
      textAlign: "center",
      fontWeight: 400,
      fontSize: "15px",
      lineHeight: "23.4px",
      color: colors.neutral.shade40,
      borderRadius: "5px",
    },
  },
  labelInputIdCard: {
    position: "relative",
    left: "2.3%",
    top: "-2px",
    fontWeight: 500,
    fontSize: "12px",
    transform: "scale(0.99415, 1.143)",
    color: colors.neutral.shade40,
    fontFamily: "Roboto",
    lineHeight: "15.6px",
  },
  labelNextButton: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontStyle: "normal",
    fontSize: "12px",
    lineHeight: "14.06px",
  },
});
export const CardIdInput = withStyles((theme) => ({
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: colors.readOnly.light.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "'-apple-system'",
      "'BlinkMacSystemFont'",
      "'Segoe UI'",
      "'Roboto'",
      "'Helvetica Neue'",
      "'Arial'",
      "'sans-serif'",
      "'Apple Color Emoji'",
      "'Segoe UI Emoji'",
      "'Segoe UI Symbol'",
    ].join(","),
    "&:focus": {
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);
