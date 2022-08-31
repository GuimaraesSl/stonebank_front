import React from 'react'
import { Button } from '@material-ui/core'
import { useStyle } from './DetailsButton.style'

interface DetailsButtonProps {
  title: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const DetailsButton: React.FC<DetailsButtonProps> = ({
  title,
  onClick,
}: DetailsButtonProps) => {
  const style = useStyle()

  return (
    <Button
      onClick={onClick}
      className={style.detailsButton}
      variant="outlined"
      color="primary"
      data-test-id="details-button"
    >
      <div>{title}</div>
    </Button>
  )
}
