import React from 'react'
import { Box } from '@material-ui/core'
import { useStyles } from './OrientationBarIcon.style'
import { Icon } from 'components/Icon'

export const OrientationBarIcon: React.FC = () => {
  const styles = useStyles()
  return (
    <Box className={styles.container} data-test-id="orientation-bar">
      <Icon name={'orientationBar'} className={styles.orientationBar} />
    </Box>
  )
}
