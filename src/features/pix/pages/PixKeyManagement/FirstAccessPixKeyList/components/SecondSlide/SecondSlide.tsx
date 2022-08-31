import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useStyles } from './SecondSlide.style'
import { SlideContent } from '../SlideContent'
import { Icon } from 'components/Icon'

export const SecondSlide: React.FC = () => {
  const styles = useStyles()

  return (
    <SlideContent>
      <>
        <Box display="flex" justifyContent="center">
          <Icon name={'pixKeysFive'} className={styles.image} />
        </Box>
      </>
      <Typography className={styles.text}>
        Cada chave só poderá ser vinculada a uma única conta. Cada pessoa física
        poderá cadastrar até 5 (cinco) chaves para uma mesma conta.
      </Typography>
    </SlideContent>
  )
}
