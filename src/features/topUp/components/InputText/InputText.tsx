import React from 'react'
import { Box } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { useStyle } from './InputText.style'

interface DescriptionProps {
  description: string
  placeholder?: string
  isVisible?: string
}

export const InputText: React.FC<DescriptionProps> = ({
  description,
  placeholder,
  isVisible,
}) => {
  const style = useStyle({ isVisible })

  return (
    <Box className={style.container}>
      <label className={style.descriptionLabel}>{description}</label>
      <Box className={style.inputContent}>
        <TextField
          className={style.textFieldContent}
          id="inputText"
          variant="outlined"
          placeholder={placeholder}
          data-test-id="input-text"
        />
      </Box>
    </Box>
  )
}
