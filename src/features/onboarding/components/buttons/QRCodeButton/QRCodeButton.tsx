import React from 'react'
import { Button } from '@material-ui/core'

import './QRCodeButton.scss'

interface QRCodeButtonProps {
  imagePath?: string | React.ReactNode
  title: string
}

export const QRCodeButton = ({ title, imagePath }: QRCodeButtonProps) => {
  return (
    <Button
      data-test-id="qr-code-button"
      className="IDButton"
      variant="outlined"
      color="primary"
      fullWidth
    >
      <div className="propButton">
        {typeof imagePath === 'string' ? (
          <img src={imagePath} className="iconIDButton" alt="bgButton" />
        ) : (
          imagePath
        )}
        <div className="label">{title}</div>
      </div>
    </Button>
  )
}
