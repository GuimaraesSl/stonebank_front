import { Box, Fade } from "@material-ui/core";
import React from "react";
import { SlideBottomText } from "./SlideBottomText";

export const SlideContent: React.FC = ({ children }) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <Fade in timeout={120}>
      <Box
        display="flex"
        flexDirection="column"
        flexGrow={1}
        justifyContent="space-between"
      >
        {childrenArray && <Box>{childrenArray[0]}</Box>}
        {childrenArray[1] && (
          <SlideBottomText>{childrenArray[1]}</SlideBottomText>
        )}
      </Box>
    </Fade>
  );
};
