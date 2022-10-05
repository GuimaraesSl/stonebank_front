import { makeStyles } from "@material-ui/core";
import { colors } from "_config/theme";

export const useStyles = makeStyles({
  subheader: {
    marginTop: 8,
    fontWeight: 700,
    color: colors.source.neutral,
    "& .MuiTypography-root": {
      fontWeight: "inherit",
    },
  },
  title: {
    fontSize: 12,
    textAlign: "center",
  },
  value: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 400,
    color: colors.source.neutral,
    textAlign: "center",
    margin: "5px",
    marginTop: "20px",
  },
  qrCodeWrapper: {
    padding: "0 64px",
  },
  qrCode: {
    width: "100%",
    flexGrow: 1,
    marginBottom: 24,
  },
  button: {
    margin: "10px",
  },
  text: {
    fontSize: 10,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
  },
});
