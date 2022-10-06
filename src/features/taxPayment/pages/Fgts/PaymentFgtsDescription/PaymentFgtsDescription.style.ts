import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  drawer: {
    "& .MuiDrawer-paper": {
      background: "transparent",
    },
  },
  scheduleButton: {
    marginTop: 64,
    "& .MuiFormControl-root": {
      display: "none",
    },
  },
  buttonTagFloating: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
  },
  titleAndDescriptionFilter: {
    marginTop: "10%",
    fontSize: "12px",
    lineHeight: "120%",
  },
});
