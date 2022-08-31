import { makeStyles } from "@material-ui/core";
import { colors } from "_config/theme";

export const useStyles = makeStyles({
  detailTransferContent: {
    width: "100%",
    color: colors.neutral.shade40,
    fontSize: "1rem",
  },

  transferDetail: {
    fontSize: '1rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '17px',
    marginRight: '25px',
    lineHeight: '110%',
  },
})
