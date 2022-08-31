import React from 'react'
import { ConfigContext } from '_config'
import { CurrencyFormatter, DateFormatter } from '_translate'
import { useStyles } from './DetailTransferDescription.style'
import { TransactionDetail } from 'components/TransactionDetail'
import { TransactionDetailName } from 'components/TransactionDetailName'
import { TransactionDetailValue } from 'components/TransactionDetailValue'
import { Typography } from '@material-ui/core'

interface DetailTransferDescriptionProps {
  value: number
  accountName: string
  date?: Date
  description?: string
  tags?: React.ReactNode
}

export const DetailTransferDescription: React.FC<
  DetailTransferDescriptionProps
> = ({ value, accountName, date, description }) => {
  const { company } = React.useContext(ConfigContext)

  const styles = useStyles()

  return (
    <React.Fragment data-test-id="detail-transfer-content">
      <TransactionDetail className={styles.detailTransferContent}>
        <TransactionDetailName>Transferência no valor de</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{CurrencyFormatter.format(value)}</strong>
        </TransactionDetailValue>
        <TransactionDetailName>
          para a conta {company.name} de
        </TransactionDetailName>
        <TransactionDetailValue>
          <strong>{accountName}</strong>
        </TransactionDetailValue>
        <TransactionDetailName>
          <div> no dia </div>
        </TransactionDetailName>
        <TransactionDetailValue>
          <strong>{DateFormatter.format(date)}</strong>
        </TransactionDetailValue>
        <TransactionDetailName>
          <div> sua descrição foi </div>
        </TransactionDetailName>
        <TransactionDetailValue>
          <strong> {description} </strong>
        </TransactionDetailValue>
      </TransactionDetail>
    </React.Fragment>
  )
}
