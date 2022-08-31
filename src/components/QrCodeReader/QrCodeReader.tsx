import React from 'react'
import QrReader from 'react-qr-reader'

interface QrCodeReaderProps {
  onScanFail: (_?: any) => void
  onScanComplete: (_: string | null) => void
}

export const QrCodeReader: React.FC<QrCodeReaderProps> = ({
  onScanFail,
  onScanComplete,
}) => {
  return <QrReader delay={1000} onScan={onScanComplete} onError={onScanFail} />
}
