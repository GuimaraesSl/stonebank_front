import { makeStyles } from "@material-ui/core";
import { colors } from "_config/theme";

export const useStyles = makeStyles({
  cardLabelPanLastDigits: {
    display: 'flex',
    fontSize: 12,
    flexDirection: "column",
    color: colors.neutral.shade40,
    marginRight: 10,
    marginLeft: 4,
  },
  panLastDigitsInput: {
    fontSize: '30px',
    border: `0.8px solid ${colors.neutral.shade30}`,
    color: colors.system.light.neutral,
    height: '55px',
    width: '42px',
  },
})
