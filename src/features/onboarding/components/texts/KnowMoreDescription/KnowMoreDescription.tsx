import { Typography } from '@material-ui/core'
import { useStyles } from './KnowMoreDescription.styles'
import { Link } from 'react-router-dom'

export const KnowMoreDescription: React.FC = () => {
  const styles = useStyles()

  return (
    <Typography
      variant="subtitle2"
      align="left"
      className={styles.description}
      data-test-id="know-more-description"
    >
      <Link to="" className={styles.link}>
        Clique aqui
      </Link>{' '}
      para conhecer
      <br />
      mais sobre o OpenBank
    </Typography>
  )
}
