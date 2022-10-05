import { makeStyles } from "@material-ui/core";
import { colors } from "_config";

export const useStyles = makeStyles({
  header: {
    height: "100px",
    width: "246px",
  },

  doubtButtonContainer: {
    "& button": {
      width: "100%",
      height: "80px",
      boxShadow:
        "0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24)",
      borderRadius: "2px",
      display: "flex",
      "& span": {
        justifyContent: "left",
      },
      "& img:nth-child(1)": {
        width: "35px",
        height: "31px",
        marginLeft: "3px",
      },
      "& img:nth-child(3)": {
        width: "12px",
        height: "12px",
        justifySelf: "end",
      },
      "& .internButtonBox": {
        display: "flex",
        width: "95%",
        justifyContent: "space-between",
        alignItems: "center",
      },
      "& .balloonAndLabelBox": {
        display: "flex",
        alignItems: "center",
      },
      "& .doubtLabelBox": {
        display: "flex",
        flexDirection: "column",
        marginLeft: "21px",
        textAlign: "left",
        "& .titleLabel": {
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "13px",
          lineHeight: "15px",
          color: colors.neutral.shade40,
          justifySelf: "start",
        },
      },
    },
  },

  mainContainer: {
    "& main": {
      display: "grid",
    },
  },

  content: {
    display: "grid",
    justifyContent: "space-between",
  },

  textBottom: {
    display: "flex",
    alignItems: "end",
  },

  text: {
    fontStyle: "normal",
    fontSize: "12px",
    fontWeight: 300,
    lineHeight: "15.6px",
    color: "#555555",
  },

  link: {
    color: "#33375",
    fontWeight: 400,
  },

  actionList: {
    margin: "0 auto",
    width: "95%",
  },
});
