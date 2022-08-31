import React from 'react'
import { Typography } from '@material-ui/core'
import { useStyles } from './FirstSlide.style'
import { SlideContent } from '../SlideContent'
import { Icon } from 'components/Icon'

export const FirstSlide: React.FC = () => {
  const styles = useStyles()

  const pixIcon = React.useMemo(() => {
    return <Icon name={'pixFilled'} className={styles.pixIcon} />
  }, [])

  return (
    <SlideContent>
      <>
        {pixIcon}
        <Typography variant="h1" className={styles.title}>
          <Icon name="pixWelcomeMessage" />
        </Typography>
      </>
      Aqui você terá acesso ao novo produto de pagamentos instantâneos do Banco
      Central do Brasil. Com ele você poderá realizar, em poucos segundos,
      pagamentos e recebimentos a qualquer dia e horário, inclusive finais de
      semana.
    </SlideContent>
  )
}
