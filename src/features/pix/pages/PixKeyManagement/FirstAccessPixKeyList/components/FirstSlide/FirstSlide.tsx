import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useStyles } from './FirstSlide.style'
import { SlideContent } from '../SlideContent'
import { Icon } from 'components/Icon'

export const FirstSlide: React.FC = () => {
  const styles = useStyles()

  return (
    <SlideContent>
      <>
        <Box display="flex" justifyContent="center">
          <Icon name={'pixKeysFirsAccess'} className={styles.image} />
        </Box>
      </>
      <Typography className={styles.text}>
        O registro da chave possibilita receber um Pix de forma prática. Com a
        chave, ao invés do pagador digitar todas as informações para identificar
        sua conta, bastará informar a chave registrada, que pode ser o número de
        celular, CPF/CNPJ, e-mail ou Chave Aleatória.
      </Typography>
    </SlideContent>
  )
}
