import React from 'react'
import { ListItem } from '@material-ui/core'
import { useStyles } from './ActionListItem.style'

interface ActionListItemProps {
  className?: string
  onClick?: VoidFunction
}

export const ActionListItem: React.FC<ActionListItemProps> = ({
  className,
  onClick,
  children,
  ...rest
}) => {
  const styles = useStyles()
  className = `${styles.actionListItem} ${className}`

  return (
    <ListItem button component="li" className={className} onClick={onClick} {...rest}>
      {children}
    </ListItem>
  )
}
