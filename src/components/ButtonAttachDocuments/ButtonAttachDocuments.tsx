import React, { useState } from 'react'
import { Box, Button } from '@material-ui/core'
import { useStyles } from './ButtonAttachDocuments.style'
import { Attachment } from 'features/transference/redux/models/attachment'
import { useDispatch } from 'react-redux'

interface ButtonAttachDocumentsProps {
  title: string
  imagePath: string | React.ReactNode
  attachments: Attachment[]
  setAttachments: (attachments: Attachment[]) => void
}

export const ButtonAttachDocuments: React.FC<ButtonAttachDocumentsProps> = ({
  title,
  imagePath,
  attachments,
  setAttachments,
}: ButtonAttachDocumentsProps) => {
  const dispatch = useDispatch()
  const styleButtonAttachDocuments = useStyles()

  const uploadImage = async (e: any) => {
    const file = e.target.files[0]
    let extension = ''

    if (file != null || file != undefined)
      extension = '.'.concat(file.name.split('.').pop())
    const base64 = await convertBase64(file)
    let cont = String(base64)

    let content = cont.replace(
      cont.substring(0, cont.indexOf('base64,') + 7),
      '',
    )

    if (attachments !== null) {
      setAttachments([...attachments, { content, extension }])
    }
  }
  const convertBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = error => {
        reject(error)
      }
    })
  }

  return (
    <Button
      component="label"
      className={styleButtonAttachDocuments.ButtonAttachDocuments}
    >
      <input
        type="file"
        hidden
        id="raised-button-file"
        onChange={e => {
          uploadImage(e)
        }}
      />
      <label
        htmlFor="raised-button-file"
        className={styleButtonAttachDocuments.contentAttachDocuments}
      >
        {imagePath}
        <Box className={styleButtonAttachDocuments.labelAttachDocuments}>
          {' '}
          {title}{' '}
        </Box>
      </label>
    </Button>
  )
}
