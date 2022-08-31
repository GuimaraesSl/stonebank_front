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
  gender: {
    genderdiversity: string
    genderdiversitys: string
  }
  setGender: (gender: {
    genderdiversity: string
    genderdiversitys: string
  }) => void
}
export const SearchFilter: React.FC<SearchFilterProps> = ({
  gender,
  setGender,
}: SearchFilterProps) => {
  const [card, loading, errorMessage] = useSelector<
    StoreState,
    [Card | undefined, boolean, string | undefined]
  >(state => [state.card.card, state.card.loading, state.card.errorMessage])
  const style = useStyles()
  const dispatch = useDispatch()

  const Genderdiversitys = ['Masculino', 'Feminino', 'Outros']
  const onChange = (operation: string) => {
    switch (operation) {
      case 'Masculino':
        dispatch(updateCard({ ...card!, gender: 0 }))
        break
      case 'Feminino':
        dispatch(updateCard({ ...card!, gender: 1 }))
        break
      case 'Outros':
        dispatch(updateCard({ ...card!, gender: 2 }))
        break
    }
  }

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const Genderdiversity = event.target.name as keyof typeof gender
    setGender({
      ...gender,
      [Genderdiversity]: event.target.value,
    })
  }

  return (
    <Box>
      <InputLabel className={style.informativetext} id="">
        Gênero
      </InputLabel>
      <Select
        label="Gênero"
        name="genderdiversity"
        margin="none"
        onChange={handleChange}
        value={gender.genderdiversity}
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
        {Genderdiversitys.map(genderdiversity => (
          <MenuItem
            onClick={() => onChange(genderdiversity)}
            value={genderdiversity}
            className={style.selectGender}
            key={genderdiversity}
          >
            {genderdiversity}
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
