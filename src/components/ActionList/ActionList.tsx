import React from "react";
import { Box } from "@material-ui/core";
import { Divider } from "components/Divider";
import { useStyles } from "./ActionList.style";

interface ActionListProps {
  className?: string;
}

export const ActionList: React.FC<ActionListProps> = ({
  className,
  children,
}) => {
  const styles = useStyles();

  className = `${styles.actionList} ${className}`;
  const childrenArray = React.Children.toArray(children);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      component="ul"
      className={className}
    >
      {children && (
        <React.Fragment>
          {childrenArray.map((child) => (
            <React.Fragment>
              {child}
              {childrenArray.indexOf(child) !== childrenArray.length - 1 && (
                <Divider spacing={0} />
              )}
            </React.Fragment>
          ))}
        </React.Fragment>
      )}
    </Box>
  );
};
