import React from 'react'

import { BadgeChangeProfileButton } from 'features/account/components/BadgeChangeProfileButton'
import { EditPageHeader } from 'features/account/components/EditPageHeader'
import { Container, TextField } from '@material-ui/core'
import { useStyle } from '_assets/makeStyles/container/container.style'
import { BadgeButton } from 'components/BadgeButton'
import { useStyles } from './EditAccount.style'
import '_assets/css/forms/mainform.scss'
import { Icon } from 'components/Icon'

export const EditAccount: React.FC = () => {
  const styles = useStyles()
  const style = useStyle()

  return (
    <Container maxWidth="xs" className={style.container}>
      <div className="main-form">
        <div className="form-body">
          <EditPageHeader />
          <div className={styles.contentEdit}>
            <Icon className={styles.imageUser} name={'imageUserMasMax'} />
          </div>
          <div className={styles.contentEdit}>
            <BadgeChangeProfileButton
              data-test-id="content-edit"
              title="Alterar Foto"
              imagePath={<Icon name="buttonBg" />}
            />
          </div>
          <div className={styles.alingInputEditNickname}>
            <TextField
              data-test-id="edit-nickname"
              label="Editar apelido da conta"
              value="Pedro Victor Nascimento Oliveira"
            />
          </div>
          <div className={styles.formFooterEdit}>
            <BadgeButton
              data-test-id="save-button"
              title="Salvar"
              imagePath={<Icon name="confirm" />}
              redirectRoute=" "
            />
          </div>
        </div>
      </div>
    </Container>
  )
}
