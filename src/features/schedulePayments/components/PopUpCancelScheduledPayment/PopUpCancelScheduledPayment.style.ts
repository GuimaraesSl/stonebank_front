import { makeStyles } from "@material-ui/core";
import { colors } from "_config/theme";

export const useStyle = makeStyles({
  drawer: {
    "& .MuiDrawer-paper": {
      background: "transparent",
      boxShadow: "none",
    },
  },
  content: {
    padding: "16px",
    marginTop: "12px",
    minHeight: "212px",
    position: "relative",
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
    backgroundColor: colors.system.light.background,
  },
  closeButton: {
    position: "absolute",
    right: "16px",
    top: "-12px",
  },
  titlePopUp: {
    width: "230px",
    fontWeight: 700,
    fontSize: "16px",
    marginTop: "20px",
    lineHeight: "16px",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    transform: "scale(0.973683,0.974619)",
    color: colors.system.light.primary,
  },
  description: {
    marginTop: "26px",
    color: colors.system.light.primary,
  },
  textDescription: {
    fontWeight: 600,
    fontSize: "15px",
    marginTop: "14px",
    lineHeight: "14px",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    transform: "scale(0.979524, 1.030807)",
  },
  descriptionValue: {
    fontWeight: 600,
    fontSize: "22px",
    marginTop: "14px",
    lineHeight: "14px",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    transform: "scale(0.979524, 1.030807)",
  },
  confirmButton: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  button: {
    position: "relative",
    width: "142px",
    fontSize: "12px",
    textAlign: "right",
    borderRadius: "8px",
    border: `1px solid ${colors.neutral.shade60}`,
    backgroundColor: colors.system.light.onPrimary,
    "& .MuiButton-label": {
      textAlign: "center",
      textTransform: "none",
      color: colors.neutral.shade40,
    },
    "& .MuiSvgIcon-colorPrimary": {
      marginRight: "3px",
      color: colors.system.light.error,
    },
    "&:hover": {
      backgroundColor: colors.readOnly.light.surface5,
      "& .MuiButton-label": {
        color: colors.system.light.onPrimary,
      },
    },
  },
});
