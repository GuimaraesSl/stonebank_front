interface VoucherProps {
  value: string
  account: string
  cpf: string
  data: string
  description: string
}

export const voucher: VoucherProps[] = [
  {
    value: '137,00',
    account: 'Pedro Victor Da Silva',
    cpf: '055.555.555-78',
    data: '23 de novembro de 2020',
    description: 'Serviços Prestados',
  },
]
