import React from 'react'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon'
import { scheduleLabel } from 'constants/buttons/labels'
import { DatePicker } from '@material-ui/pickers'
import { Icon } from 'components/Icon'

interface SchedulingButtonProps {
  open?: boolean
  value: Date | null
  minDate: Date
  onClick?: VoidFunction
  onDateSelection?: (date: Date | null) => void
  onClose?: VoidFunction
  disabled?: boolean
}

export const SchedulingButton: React.FC<SchedulingButtonProps> = ({
  open,
  value,
  minDate,
  onClick,
  onDateSelection,
  onClose,
  disabled,
}) => {
  return (
    <React.Fragment>
      <ButtonWithFloatingIcon
        icon={<Icon name={'schedule'} />}
        onClick={onClick}
        disabled={disabled}
        data-test-id="schedule-button"
      >
        {scheduleLabel}
      </ButtonWithFloatingIcon>
      {open && (
        <DatePicker
          value={value}
          minDate={minDate}
          open={true}
          onAccept={onDateSelection}
          onChange={() => {}}
          onClose={onClose}
          data-test-id="scheduling-button"
        />
      )}
    </React.Fragment>
  )
}
