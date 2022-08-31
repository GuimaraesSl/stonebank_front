import React from 'react'
import { Card, Typography } from '@material-ui/core'
import { useStyle } from './AccountListPopUp.style'
import { Account } from 'features/account/redux/models/account'

interface AccountListPopUpProps {
  account: Account
  pathImage: string | React.ReactNode
  stateImage?: string | React.ReactNode
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export const AccountListPopUp: React.FC<AccountListPopUpProps> = ({
  account,
  pathImage,
  stateImage,
  onClick,
  ...rest
}: AccountListPopUpProps) => {
  const style = useStyle()

  return (
    <Card
      className={style.allAccountCard}
      variant="outlined"
      onClick={onClick}
      data-test-id="account-card"
      {...rest}
    >
      <div>
        {typeof pathImage === 'string' ? (
          <img src={pathImage} alt="Fechar" />
        ) : (
          pathImage
        )}
      </div>
      <div>
        <Typography variant="caption" display="block" gutterBottom>
          <div className={style.infoAllAccounts} data-test-id="accounts-list">
            <div className={style.nameAccount}>
              <strong>{account!.name}</strong>
            </div>
            <div
              className={style.accountInformations}
              data-test-id="account-information"
            >
              {account!.spbBankBranch && (
                <span>
                  Conta {account!.spbBankAccount}-{account!.spbBankAccountDigit}{' '}
                </span>
              )}
              <br />
              {account!.spbBank && <span>Banco {account!.spbBank} </span>}
            </div>
          </div>
        </Typography>
      </div>
      <div data-test-id="account-selection" className={style.imageAccunt}>
        {typeof stateImage === 'string' ? (
          <img src={stateImage} alt="" />
        ) : (
          stateImage
        )}
      </div>
    </Card>
  )
}
