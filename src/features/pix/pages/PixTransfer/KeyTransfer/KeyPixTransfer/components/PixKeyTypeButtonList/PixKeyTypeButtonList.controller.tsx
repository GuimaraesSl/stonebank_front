import { KeyType } from 'features/pix/redux/models/keyType'
import React from 'react'
import { PixKeyTypeButtonListView } from './PixKeyTypeButtonList.view'

interface PixKeyTypeButtonListProps {
  onKeyTypeChange: (_: KeyType) => void
}

export const PixKeyTypeButtonList: React.FC<PixKeyTypeButtonListProps> = ({
  onKeyTypeChange,
}) => {
  const [selectedKeyType, setSelectedKeyType] = React.useState(KeyType.phone)

  return (
    <PixKeyTypeButtonListView
      selectedKeyType={selectedKeyType}
      setKeyType={k => {
        setSelectedKeyType(k)
        onKeyTypeChange(k)
      }}
    />
  )
}
