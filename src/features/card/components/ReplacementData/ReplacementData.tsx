import React from 'react'
import { CurrencyFormatter } from '_translate'
import { Box } from '@material-ui/core'
import { useStyle } from './ReplacementData.style'

interface ReplacementDetailsProps {
  card: string
  address: string
  value: number
  deadline: string
}

export const ReplacementData: React.FC<ReplacementDetailsProps> = ({
  card,
  address,
  value,
  deadline,
}) => {
  const style = useStyle()
  return (
    <Box
      className={style.detailReplacement_content}
      data-test-id="replacement-content"
    >
      <Box className={style.contentdetail} data-test-id="content-detail">
        <Box> O cartão </Box>
        <Box className={style.transfer_detail}>{card}</Box>
        <Box className={style.cancel_detail}>
          {' '}
          será cancelado definitivamente.{' '}
        </Box>
        <Box className={style.address_detail}>
          O novo cartão será enviado para o endereço
        </Box>
        <Box className={style.transfer_detail}> {address} </Box>
      </Box>
      <Box className={style.contentdetail} data-test-id="content-detail">
        <Box> Valor cobrado </Box>
        <Box className={style.transfer_detail}>
          {CurrencyFormatter.format(value)}
        </Box>
      </Box>
      <Box className={style.contentdetail}>
        <Box> Prazo estimado </Box>
        <Box className={style.transfer_detail}> {deadline} </Box>
      </Box>
    </Box>
  )
}
