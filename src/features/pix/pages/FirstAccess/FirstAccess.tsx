import React from "react";
import { Button } from "components/Button";
import {
  PageContainer,
  ProcessPageFooterButton,
  ProcessPageLayout,
} from "components";
import { useStyles } from "./FirstAccess.style";
import { nextLabel, skipLabel } from "constants/buttons/labels";
import { Box, Toolbar, Typography } from "@material-ui/core";
import {
  FirstSlide,
  SecondSlide,
  SlideIndicator,
  ThirdSlide,
} from "./components";
import { Redirect, useHistory } from "react-router-dom";
import { PixRoutes } from "features/pix/constants/routes";

const localStorageKey = "firstAccessToPix";

export const FirstAccess: React.FC = () => {
  const history = useHistory();
  const slides = React.useMemo(() => {
    return [<FirstSlide />, <SecondSlide />, <ThirdSlide />];
  }, []);
  const [slideIndex, setSlideIndex] = React.useState(0);
  const styles = useStyles();
  const isLastIndex = slideIndex === 2;

  const onSkipClick = () => {
    setSlideIndex(slides.length - 1);
  };

  const onReturnClick = () => {
    setSlideIndex(slideIndex - 1);
  };

  const onNextClick = () => {
    if (isLastIndex) {
      localStorage.setItem(localStorageKey, "false");
      setSlideIndex(slideIndex);
      history.push(PixRoutes.pixArea);
      return;
    }

    setSlideIndex(slideIndex + 1);
  };

  if (localStorage.getItem(localStorageKey) === "false")
    return <Redirect to={PixRoutes.pixArea} push={false} />;

  return (
    <PageContainer className={styles.container}>
      <ProcessPageLayout
        appBar={
          <Toolbar component="header" className={styles.toolbar}>
            {slideIndex > 0 && (
              <Typography variant="h6" id="title">
                Pix
              </Typography>
            )}
            {!isLastIndex && (
              <Button
                palette="secondary"
                size="small"
                onClick={onSkipClick}
                id="skip-button"
              >
                {skipLabel}
              </Button>
            )}
          </Toolbar>
        }
        main={
          <Box display="flex" flexDirection="column">
            {slides[slideIndex]}
            <SlideIndicator length={slides.length} currentIndex={slideIndex} />
          </Box>
        }
        footer={
          <Box
            display="grid"
            gridColumnGap="16px"
            gridTemplateColumns="1fr 1fr"
            gridTemplateRows="1fr"
          >
            <Box>
              {slideIndex > 0 && (
                <ProcessPageFooterButton onClick={onReturnClick} />
              )}
            </Box>

            <Box>
              <ProcessPageFooterButton forwardButton onClick={onNextClick}>
                {isLastIndex ? "Entendi" : nextLabel}
              </ProcessPageFooterButton>
            </Box>
          </Box>
        }
      />
    </PageContainer>
  );
};
