export interface Application {
  key: string
  aesKey: string
  aesIV: string
}

export interface Company {
  address: string
  appStoreUrl: string
  email: string
  helpLink: string
  name: string
  phone: string
  playStoreUrl: string
  website: string
  whatsApp?: string
  youtube?: string
  taxId?: string
  linkHelp?: string
}
