import { makeStyles } from "@material-ui/core";
import { colors, theme } from "_config/theme";

export const useStyle = makeStyles({
  menuHeader: {
    padding: '20px 20px 5px 15px'
  },
  searchBox: {
    backgroundColor: "#FFF",
    position: 'relative',
    margin: 'auto', 
    width: 'fit-content', 
    marginTop: '-20px',
    zIndex: 1,
    borderRadius: '16px'
  },
  searchField: {
    '& > *': {
      borderRadius: '16px',
      color: '#000'
    },
  },
  mainHeader: {
    position: "relative",
    width: "100%",
    color: colors.readOnly.light.white,
    backgroundColor: colors.system.light.primary, // #117E9B, #DB3E4D, #2CB060
    borderRadius: `0px 0px 12px 12px`,
    boxShadow: `0px 2px 4px rgba(0, 0, 0, 0.25);`,

    "& > .MuiCardContent-root": {
      paddingBottom: 25,
    },
  },

  greetingsSection: {
    // marginBottom: 16,

    "& .MuiTypography-root": {
      fontSize: "13px",
      fontWeight: 500,
    },
  },

  balanceSection: {
    // marginBottom: 16,

    "& .MuiTypography-root": {
      fontSize: "13px",
      fontWeight: 500,
    },
  },

  bottomFloatingButton: {
    position: "absolute",
    left: 25,
    bottom: -8,
  },

  toolbar: {
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    height: 24,
  },

  extractButton: {
    border: "1px solid #FFF",
    borderRadius: "8px",
    color: "#FFF",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontSize: "12px",
    fontWeight: 500,
    width: "88px",
  },
});
