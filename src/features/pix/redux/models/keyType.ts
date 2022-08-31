export class KeyType {
  private _value: number = 1

  private constructor(value: number) {
    this._value = value
  }

  get value() {
    return this._value
  }

  static get values() {
    return [KeyType.phone, KeyType.taxId, KeyType.email, KeyType.random]
  }

  get displayString() {
    switch (this._value) {
      case KeyType.phone.value:
        return 'Celular'

      case KeyType.taxId.value:
        return 'CPF / CNPJ'

      case KeyType.email.value:
        return 'E-mail'

      case KeyType.random.value:
        return 'Aleatória'

      default:
        throw new Error('Tipo inválido')
    }
  }
  static personTaxId = new KeyType(0)
  static taxId = new KeyType(1)
  static email = new KeyType(2)
  static phone = new KeyType(3)
  static random = new KeyType(4)
}
