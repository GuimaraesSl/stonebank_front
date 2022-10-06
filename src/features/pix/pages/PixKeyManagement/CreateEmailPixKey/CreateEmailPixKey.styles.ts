import { makeStyles } from "@material-ui/core";
import { colors } from "_config/theme";

export const useStyles = makeStyles({
  emailInput: {
    marginTop: "10px",
  },
  importantWarning: {
    marginTop: "30px",
  },
  txtalert: {
    fontSize: 15,
    marginTop: 10,
  },
  inputError: {
    color: colors.system.light.error,
    fontSize: "14",
    fontFamily: "Roboto",
  },
  componentName: {
    fontSize: 20,
    fontWeight: 700,
    marginTop: 12,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  componentCpf_Cnpj: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: { display: "flex", justifyContent: "space-between" },
});
