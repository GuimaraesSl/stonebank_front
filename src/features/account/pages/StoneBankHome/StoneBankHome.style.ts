import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  pageContainer: {
    backgroundColor: "#FFF",
  },
  header: {
    zIndex: 1,
  },
  title: {
    fontSize: '12px',
    fontFamily: 'Roboto',
    fontWeight: 500,
  },
  functions: {
    borderRadius: '100%',
    height: '60px',
    width: '60px',
    backgroundColor: '#D9D9D9',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  functionIcon: {
    // alignSelf: 'center',
    // margin: 'auto'
  }
});
