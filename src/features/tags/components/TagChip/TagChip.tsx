import React from 'react'
import { useStyles } from './TagChip.style'
import { Chip } from '@material-ui/core'

interface TagChipProps {
  label?: string
  selected?: boolean
  disabled?: boolean
  onClick?: (_: string) => void
}

export const TagChip: React.FC<TagChipProps> = ({
  label,
  disabled,
  onClick,
}) => {
  const [status, setStatus] = React.useState(disabled)
  const styles = useStyles()

  return (
    <React.Fragment>
      <Chip
        className={styles.root}
        label={label}
        disabled={status}
        variant="outlined"
        onClick={() => onClick!(label!)}
      />
    </React.Fragment>
  )
}
