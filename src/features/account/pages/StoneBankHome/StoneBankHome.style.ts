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
    color: '#000'
  },
  functions: {
    borderRadius: '100%',
    height: '60px',
    width: '60px',
    backgroundColor: '#D9D9D9',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0'
  },
  functions2: {
    height: '40px',
    width: '61px',
    backgroundColor: '#D9D9D9',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto'
  },
  functionName: {
    color: '#000',
    fontSize: '12px',
    textAlign: 'center'
  },
  functionIcon: {
    color: '#000',
    // alignSelf: 'center',
    // margin: 'auto'
  }
});
