import React from 'react'
import { Box, MenuItem, Select, Typography } from '@material-ui/core'
import { useStyles } from './SearchFilter.style'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import {
  getFutureTransactions,
  updateTransactions,
} from 'features/schedulePayments/redux/actions'

interface SearchFieldProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchFilter: React.FC<SearchFieldProps> = () => {
  const style = useStyles()
  const dispatch = useDispatch()

  const { futureTransaction, loading, errorMessage } = useSelector(
    (state: StoreState) => state.futureTransactions,
  )

  const operationTypes = [
    { value: 99, name: 'Todos' },
    { value: 2, name: 'Boleto a Pagar' },
    { value: 3, name: 'Transferência' },
    { value: 6, name: 'Transferência Interna' },
    { value: 8, name: 'Gare' },
    { value: 11, name: 'Fgts' },
    { value: 12, name: 'Darj' },
    { value: 13, name: 'Transferência por SMS' },
  ]

  const valueSelect = (select?: number | null) =>
    operationTypes.find(op => op.value === select)

  return (
    <Box>
      <Typography color="primary" variant="caption" gutterBottom>
        Tipo de transação
      </Typography>
      <Select
        data-test-id="search-filter"
        label="Tipo de transação"
        name="operationType"
        margin="none"
        value={valueSelect(futureTransaction?.operationType)?.name ?? 'Todos'}
        className={style.selectTransactionType}
        fullWidth
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        }}
        inputProps={{
          'aria-label': 'operationType',
        }}
      >
        {operationTypes?.map(operation => (
          <MenuItem
            data-test-id="operation-type"
            onClick={() =>
              dispatch(
                updateTransactions({
                  ...futureTransaction,
                  operationType: operation.value,
                }),
              ) && dispatch(getFutureTransactions())
            }
            value={operation.name}
            className={style.selectTransactionType}
          >
            {operation.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}
