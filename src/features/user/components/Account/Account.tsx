import { Grid, Typography } from '@material-ui/core'
import { useStyles } from './Account.style'
import { Icon } from 'components/Icon'

interface AccountProps {
  name: string
  image: string | React.ReactNode
}

export const Account: React.FC<AccountProps> = ({ name }) => {
  const styles = useStyles()

  return (
    <Grid
      data-test-id="account-button"
      container
      spacing={2}
      wrap="nowrap"
      alignItems="center"
      className={styles.account}
    >
      <Grid item className={styles.image}>
        <Icon name={'imageUser'} className={styles.img} />
      </Grid>
      <Grid item className={styles.name}>
        <Typography>{name}</Typography>
      </Grid>
    </Grid>
  )
}
