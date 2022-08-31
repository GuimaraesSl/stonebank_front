import React from 'react'
import { Typography } from '@material-ui/core'
import { useStyles } from './TitleAndDescriptionTextAttach.style'

interface TitleAndDescriptionTextAttachProps {
  title: string
  description: string
}

export const TitleAndDescriptionTextAttach = ({
  title,
  description,
}: TitleAndDescriptionTextAttachProps) => {
  const styles = useStyles()
  return (
    <div className={styles.contentTitleDescriptionAttach}>
      <Typography
        className={styles.propsTitleAttach}
        variant="body1"
        gutterBottom
        data-test-id="title-attach"
      >
        {title}
      </Typography>
      <Typography
        className={styles.prosDescriptionAttach}
        variant="body2"
        gutterBottom
        data-test-id="description-attach"
      >
        {description}
      </Typography>
    </div>
  )
}
