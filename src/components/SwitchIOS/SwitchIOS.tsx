import React from 'react'
import { AntSwitch } from './SwitchIOS.style'
import { Switch } from '@material-ui/core'

const SwitchButton = AntSwitch(Switch)
interface SwitchIOSProps {
  checked?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const SwitchIOS: React.FC<SwitchIOSProps> = ({ checked, onClick }) => {
  return (
    <SwitchButton
      data-test-id="switch-button"
      onClick={onClick}
      checked={checked}
    />
  )
}
