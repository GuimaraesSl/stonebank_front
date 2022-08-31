import React from 'react'
import { Box, InputLabel, MenuItem, Select } from '@material-ui/core'
import { useStyles } from './SearchFilter.style'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { updateCard } from 'features/card/redux/actions'
import { Card } from 'features/card/redux/models/card'
interface SearchFilterProps {
  marital: {
    maritalStatus: string
    maritalStatuss: string
  }
  setMarital: (marital: {
    maritalStatus: string
    maritalStatuss: string
  }) => void
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  marital,
  setMarital,
}: SearchFilterProps) => {
  const [card, loading, errorMessage] = useSelector<
    StoreState,
    [Card | undefined, boolean, string | undefined]
  >(state => [state.card.card, state.card.loading, state.card.errorMessage])

  const style = useStyles()
  const dispatch = useDispatch()

  const MaritalStatus = [
    'União Estável',
    'Casado',
    'Divorciado',
    'Separado',
    'Viúvo',
    'Solteiro',
    'Outros',
  ]
  const onChange = (operation: string) => {
    switch (operation) {
      case 'União Estável':
        dispatch(updateCard({ ...card!, maritalStatus: 0 }))
        break
      case 'Casado':
        dispatch(updateCard({ ...card!, maritalStatus: 1 }))
        break
      case 'Divorciado':
        dispatch(updateCard({ ...card!, maritalStatus: 2 }))
        break
      case 'Separado':
        dispatch(updateCard({ ...card!, maritalStatus: 3 }))
        break
      case 'Viúvo':
        dispatch(updateCard({ ...card!, maritalStatus: 4 }))
        break
      case 'Solteiro':
        dispatch(updateCard({ ...card!, maritalStatus: 5 }))
        break
      case 'Outros':
        dispatch(updateCard({ ...card!, maritalStatus: 6 }))
        break
    }
  }

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const maritalStatus = event.target.name as keyof typeof marital
    setMarital({
      ...marital,
      [maritalStatus]: event.target.value,
    })
  }
  return (
    <Box>
      <InputLabel className={style.informativetext} id="">
        Estado Civil
      </InputLabel>
      <Select
        label="Estado Civil"
        name="maritalStatus"
        margin="none"
        onChange={handleChange}
        value={marital.maritalStatus}
        className={style.selectGender}
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
          'aria-label': 'Genderdiversity',
        }}
      >
        {MaritalStatus.map(maritalStatus => (
          <MenuItem
            onClick={() => onChange(maritalStatus)}
            value={maritalStatus}
            className={style.selectGender}
            key={maritalStatus}
          >
            {maritalStatus}
          </MenuItem>
        ))}
        <Loader open={loading} />
        {errorMessage && (
          <Alert title="Erro" message={errorMessage} severity="error" />
        )}
      </Select>
    </Box>
  )
}
