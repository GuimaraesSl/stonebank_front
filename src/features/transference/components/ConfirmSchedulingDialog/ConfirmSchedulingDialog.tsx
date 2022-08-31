import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { invalidTransferDate } from 'features/transference/constants/messages'
import { useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { ShortDateFormatter } from '_translate'
import { Button } from 'components/Button'

interface ConfirmSchedulingDialogProps {
  open?: boolean
  onClose: (confirmed: boolean) => void
}

export const ConfirmSchedulingDialog: React.FC<
  ConfirmSchedulingDialogProps
> = ({ open, onClose }) => {
  const expectedTransferDate = useSelector(
    (state: StoreState) =>
      state.transference.transference!.expectedTransferDate,
  )

  return (
    <Dialog open={open ?? false} data-test-id="scheduling-dialog">
      <DialogTitle>Aviso</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {invalidTransferDate}
          <strong>{ShortDateFormatter.format(expectedTransferDate)}</strong>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          onClick={() => onClose(false)}
          data-test-id="no-button"
        >
          Não
        </Button>
        <Button
          variant="text"
          onClick={() => onClose(true)}
          data-test-id="yes-button"
        >
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  )
}
