import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useStyles } from './FilterSectionTitleAndDescription.style'

interface FilterSectionTitleAndDescriptionProps {
  title: string
  description: string
}

export const FilterSectionTitleAndDescription: React.FC<
  FilterSectionTitleAndDescriptionProps
> = ({ title, description }: FilterSectionTitleAndDescriptionProps) => {
  const styles = useStyles()

  return (
    <Box className={styles.wrapper}>
      <Typography
        className={styles.title}
        variant="subtitle2"
        data-test-id="filter-title"
      >
        <strong>{title}</strong>
      </Typography>
      <Typography
        className={styles.description}
        variant="caption"
        data-test-id="filter-description"
      >
        {description}
      </Typography>
    </Box>
  )
}
