import React, { useEffect } from 'react'
import { Box, Typography } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { maskPhone } from '_utils/masks/phone'
import { useMask } from 'hooks/useMask'
import { useStyle } from './InputNumber.style'

interface DescriptionProps {
  description: string
  placeholder?: string
  setValuePhone: React.Dispatch<React.SetStateAction<string>>
  valueNumberPhone?: string
}

export const InputNumber: React.FC<DescriptionProps> = ({
  description,
  placeholder,
  setValuePhone,
  valueNumberPhone = '',
}) => {
  const style = useStyle()
  const [phoneInput, setPhoneInput] = useMask(maskPhone)

  const onPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneInput(event.target.value)
  }

  useEffect(() => {
    setPhoneInput(valueNumberPhone)
  }, [])

  useEffect(() => {
    setValuePhone(phoneInput)
  }, [phoneInput])

  return (
    <React.Fragment>
      <Typography className={style.descriptionLabel}>
        <label>{description}</label>
      </Typography>
      <Box className={style.inputContent}>
        <TextField
          className={style.textFieldContent}
          id="inputNumber"
          placeholder={placeholder}
          variant="outlined"
          value={phoneInput}
          required
          onChange={onPhoneChange}
          data-test-id="change-phone"
        />
      </Box>
    </React.Fragment>
  )
}
