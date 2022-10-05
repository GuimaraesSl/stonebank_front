import { makeStyles } from "@material-ui/core";
import { CSSProperties } from "react";
import sliderIndicator from "_assets/icons/slider-indicator.svg";
import { colors, theme } from "_config";

const thumbCss: CSSProperties = {
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
  mask: `url(${sliderIndicator})`,
  background: colors.system.light.secondary,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  height: 21,
  width: 16,
};

const thumbLeftMargin = 4;
const trackGap = 2;
const trackHeight = 8;

interface StylesProps {
  availableTrackSizePercentage: number;
  minValue: number;
}

export const useStyles = makeStyles({
  labels: {
    display: "flex",
    justifyContent: "space-between",

    "& > *": {
      color: colors.neutral.shade40,
      fontSize: 12,
      lineHeight: "16px",
      marginBottom: 2,
    },
  },

  track: {
    columnGap: trackGap,
    display: "grid",
    height: trackHeight,
    position: "absolute",
    top: 0,
    width: "100%",

    "& #unavailable": {
      backgroundColor: colors.neutral.shade40,
      borderRadius: `${trackHeight / 2}px 0 0 ${trackHeight / 2}px`,
    },

    "& #available": {
      backgroundColor: theme.palette.success.main,
      borderRadius: ({ minValue }: StylesProps) => {
        return minValue
          ? `0 ${trackHeight / 2}px ${trackHeight / 2}px 0`
          : trackHeight / 2;
      },
    },
  },

  inputWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    width: `calc(100% + ${2 * thumbLeftMargin + 1}px)`,
  },

  input: {
    appearance: "none",
    height: 34,
    marginLeft: -thumbLeftMargin,
    width: ({ availableTrackSizePercentage }: StylesProps) => {
      return availableTrackSizePercentage === 100
        ? `calc(${availableTrackSizePercentage}% + ${thumbLeftMargin}px)`
        : `calc(${availableTrackSizePercentage}% + ${thumbLeftMargin}px - ${trackGap}px)`;
    },
    "&::-webkit-slider-thumb": thumbCss,
    "&::-moz-slider-thumb": thumbCss,
  },
});
