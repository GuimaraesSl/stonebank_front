import React from 'react'
import { dateLabel } from 'constants/buttons/labels'
import { DatePicker } from '@material-ui/pickers'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon'
import { Icon } from 'components/Icon'

interface DateButtonProps {
  open?: boolean
  value: Date | null
  maxDate: Date
  onClick?: VoidFunction
  onDateSelection?: (date: Date | null) => void
  onClose?: VoidFunction
}

export const DateButton: React.FC<DateButtonProps> = ({
  open,
  value,
  maxDate,
  onClick,
  onDateSelection,
  onClose,
  ...rest
}) => {
  return (
    <React.Fragment>
      <ButtonWithFloatingIcon icon={<Icon name="schedule" />} onClick={onClick}>
        {dateLabel}
      </ButtonWithFloatingIcon>
      {open && (
        <DatePicker
          value={value}
          maxDate={maxDate}
          open={true}
          onAccept={onDateSelection}
          onChange={() => {}}
          onClose={onClose}
          data-test-id="date-button"
          {...rest}
        />
      )}
    </React.Fragment>
  )
}
