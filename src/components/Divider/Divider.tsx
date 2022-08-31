import React from 'react'
import { Divider as MuiDivider } from '@material-ui/core'
import { DividerStylesProps, useStyles } from './Divider.style'

interface DividerProps extends DividerStylesProps {
  className?: string
}

export const Divider: React.FC<DividerProps> = ({ spacing, className }) => {
  const styles = useStyles({ spacing })

  return <MuiDivider className={`${styles.divider} ${className ?? ''}`} />
}
