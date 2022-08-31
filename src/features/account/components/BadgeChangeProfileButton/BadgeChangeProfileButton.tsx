import React from 'react'
import { useStyle } from './BadgeChangeProfileButton.style'
import { Button } from '@material-ui/core'

interface BadgeChangeProfileButtonProps {
  imagePath: string | React.ReactNode
  title: string
  //  onClick?:(evento: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const BadgeChangeProfileButton: React.FC<
  BadgeChangeProfileButtonProps
> = ({ title, imagePath }: BadgeChangeProfileButtonProps) => {
  const style = useStyle()

  return (
    <Button
      className={style.bgEditButton}
      variant="outlined"
      color="primary"
      data-test-id="change-profile-button"
    >
      <div className={style.propButton}>
        {typeof imagePath === 'string' ? (
          <img src={imagePath} className={style.iconBgButton} alt="bgButton" />
        ) : (
          imagePath
        )}
        <div className={style.label}>{title}</div>
      </div>
    </Button>
  )
}
