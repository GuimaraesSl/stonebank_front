import React from 'react'
import { Button } from '@material-ui/core'
import { useStyles } from './ButtonAttachDocuments.style'

interface ButtonAttachDocumentsProps {
  title: string
  imagePath: string | React.ReactNode
}

export const ButtonAttachDocuments: React.FC<ButtonAttachDocumentsProps> = ({
  title,
  imagePath,
}) => {
  const styleButtonAttachDocuments = useStyles()

  return (
    <Button
      component="label"
      className={styleButtonAttachDocuments.ButtonAttachDocuments}
      data-test-id="attach-documents-button"
    >
      <input type="file" hidden id="raised-button-file" />
      <label
        htmlFor="raised-button-file"
        className={styleButtonAttachDocuments.contentAttachDocuments}
      >
        <div className="propButton">
          {typeof imagePath === 'string' ? (
            <img
              src={imagePath}
              className={styleButtonAttachDocuments.iconAttachDocuments}
              alt="bgButton"
            />
          ) : (
            imagePath
          )}

          <div className={styleButtonAttachDocuments.labelAttachDocuments}>
            {' '}
            {title}{' '}
          </div>
        </div>
      </label>
    </Button>
  )
}
