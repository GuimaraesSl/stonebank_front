import React from 'react'
import { Button } from '@material-ui/core'

import { useStyles } from './AttachmentCard.style'

interface AttachmentCardProps {
  image: string
  title: string
  info: string
}

export const AttachmentCard: React.FC<AttachmentCardProps> = ({
  title,
  image,
  info,
}: AttachmentCardProps) => {
  const styles = useStyles()

  return (
    <Button
      className={styles.attatchmentButton}
      variant="outlined"
      color="primary"
      fullWidth
      data-test-id="attatchment-button"
    >
      <div className={styles.propButton} data-test-id="attatchment-card">
        <div className={styles.attatchmentInfoLabel}>
          <strong> {title} </strong> <br />
          <div className={styles.attachmentDetailInfo}>{info}</div>
        </div>
        <div className={styles.attachmentButtonIcon}>
          <img src={image} alt={`${title} attachmnent card`} />
          <p className={styles.viewLabel}>Ver</p>
        </div>
      </div>
    </Button>
  )
}
