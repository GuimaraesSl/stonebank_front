import React from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import { useStyle } from './SquareButtonWithIcon.style'
import { Icon } from 'components/Icon'
import { IconTypes } from 'components/Icon/Icon'

interface SquareButtonWithIconProps {
  icon: keyof typeof IconTypes
  label: string
  onClick: VoidFunction
}

export const SquareButtonWithIcon: React.FC<SquareButtonWithIconProps> = ({
  label,
  icon,
  onClick,
  ...rest
}) => {
  const style = useStyle()

  return (
    <Button className={style.button} onClick={onClick}>
      <Box
        width={80}
        height={70}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-around"
        {...rest}
      >
        <Icon name={icon} className={style.icon} />

        <Typography className={style.label}>{label}</Typography>
      </Box>
    </Button>
  )
}
