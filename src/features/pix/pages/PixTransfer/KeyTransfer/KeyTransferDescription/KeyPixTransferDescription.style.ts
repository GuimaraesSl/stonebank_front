import { makeStyles } from "@material-ui/core";
import { colors } from "_config";

export const useStyles = makeStyles({
  page: {
    "& main": {
      display: "grid",
      gridTemplateRows: "max-content max-content",
      padding: "24px 16px",
      rowGap: 24,
    },
  },

  tagsSection: {
    "& #title": {
      fontSize: 12,
      fontWeight: 500,
    },
    "& #description": {
      color: colors.neutral.shade40,
      fontSize: 12,
      fontWeight: 300,
    },
  },
  alingInputTransferDescription: {
    marginTop: "12%",
  },

  divLabel: {
    marginTop: "25px",
    width: "80%",
    display: "flex",
    lineHeight: "12px",
  },

  propsCaption: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 300,
    fontSize: "0.68rem",
  },

  badgeId: {
    marginBottom: "14.5%",
    display: "flex",
    justifyContent: "center",
  },

  alingPopupTop: {
    marginTop: "10%",
  },

  titleAndDescriptionFilter: {
    marginTop: "10%",
    fontSize: "12px",
    lineHeight: "120%",
  },

  tagsFilterStyle: {
    color: "#010101",
    border: "#010101",
    display: "flex",
  },

  tagsFilterStyleChildren: {
    display: "flex",
    marginLeft: "5px",
  },

  buttonTagFloating: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
  },

  importantWarning: {
    marginTop: "30px",
  },

  txtalert: {
    fontSize: 15,
    marginTop: 10,
    color: colors.source.neutral,
    fontWeight: 300,
    lineHeight: "130%",
  },
  footer: { display: "flex", justifyContent: "space-between" },
});
