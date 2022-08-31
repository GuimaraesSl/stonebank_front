import React from 'react'
import { Button } from '@material-ui/core'
import { useStyle } from './ShowBalanceButton.style'
import { Icon } from 'components/Icon'

interface ShowBalanceButtonProps {
  showBalance: boolean
  onClick: VoidFunction
}

export const ShowBalanceButton: React.FC<ShowBalanceButtonProps> = ({
  showBalance,
  onClick,
}: ShowBalanceButtonProps) => {
  const style = useStyle()

  return (
    <Button
      className={style.showBalanceButton}
      onClick={onClick}
      data-test-id="show-balance-button"
    >
      <Icon name={'showBalanceIconSecondary'} className={style.icon} />
      {showBalance ? 'Esconder' : 'Mostrar'} <br /> saldo
    </Button>
  )
}
