import { makeStyles } from "@material-ui/core";
import { colors } from "_config/theme";

export const useStyles = makeStyles({
  Main: {
    margin: '-16px',
  },
  ContainerHeader: {
    '& #pd-subtitle': {
      paddingBottom: '10px',
    },
  },
  ContainerCard: {
    position: 'relative',
    height: '100%',
    width: '100%',
    overflowY: 'auto',
    boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.24)',
  },
  CardPhoneIconDimension: {
    width: 23.54,
    height: 38.46,
  },
  AnotherPhoneNumber: {
    padding: '31px 16px 16px 16px',
  },
  AnotherPhone: {
    fontWeight: 500,
    fontSize: "13px",
    color: colors.neutral.shade40,
    marginLeft: "5px",
    marginBottom: "14px",
  },
  FloatingIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: '38.55px',
  },
  periodicTopUpButton: {

    display: 'flex',

    justifyContent: 'center',

    marginTop: '20px',

    marginBottom: '20px',

  },
})
