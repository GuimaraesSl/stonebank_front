import React from 'react'
import { TransactionType } from 'features/account/redux/models/transactionType'
import { Box, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { useStyles } from './TransactionTypeFilterButton.style'
import {
  getBankStatement,
  setBankStatementFilters,
} from 'features/account/redux/actions'
import { usePrevious } from 'hooks/usePrevious'
import { Icon } from 'components/Icon'
interface TransactionTypeFilterButtonProps {
  transactionType: TransactionType
}

export const TransactionTypeFilterButton: React.FC<
  TransactionTypeFilterButtonProps
> = ({ transactionType }) => {
  const filters = useSelector(
    (state: StoreState) => state.account.bankStatementFilters,
  )
  const selectedTransactionType = filters?.transactionType
  const dispatch = useDispatch()
  const styles = useStyles()
  const previous = usePrevious(selectedTransactionType)

  React.useEffect(() => {
    if (
      (previous === undefined && selectedTransactionType === transactionType) ||
      (previous === transactionType && selectedTransactionType === undefined) ||
      (previous !== selectedTransactionType &&
        transactionType === selectedTransactionType)
    ) {
      dispatch(getBankStatement())
    }
  }, [selectedTransactionType])

  const onClick = () => {
    dispatch(
      setBankStatementFilters({
        ...filters,
        transactionType:
          selectedTransactionType === transactionType
            ? undefined
            : transactionType,
      }),
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 0.5,
        }}
      >
        <Box
          className={styles.mainIcon}
          data-test-id="transaction-type-filter-button"
        >
          <Icon
            name={
              transactionType === TransactionType.received
                ? 'income'
                : 'expenses'
            }
          />
          {transactionType === selectedTransactionType && (
            <Icon name={'check'} className={styles.selectedIcon} />
          )}
        </Box>
      </Box>
      <Typography variant="caption" className={styles.label}>
        {transactionType === TransactionType.received
          ? 'Recebidos'
          : 'Enviados'}
      </Typography>
    </Box>
  )
}
