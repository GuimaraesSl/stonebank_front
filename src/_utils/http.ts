import { getApplicationToken } from 'features/authentication/utils'
import { StoreState } from 'redux/state'
import { ConfigProvider } from '_config/configProvider'

interface BaseRequestData {
  url: string
  defaultHeaders: {
    'x-api-version': number
    'x-application-key': string
    'x-application-token': string
  }
  accountKey?: string
  taxId?: string
  userTaxId?: string
  userId?: number
  accountTaxId?: string
  accountId?: number
  token?: string
  phoneNumber?: string
}

export const getBaseRequestData = async (
  endpoint: string,
  state?: StoreState,
): Promise<BaseRequestData> => {
  const appToken = await getApplicationToken()

  return {
    url: `${ConfigProvider.config.api.baseUrl}${endpoint}`,
    defaultHeaders: {
      ...ConfigProvider.config.api.defaultHeaders,
      ...appToken,
    },
    taxId: state?.auth.user?.taxId,
    userTaxId: state?.auth.user?.taxId,
    userId: state?.auth.user?.id,
    accountTaxId: state?.account.account?.taxId,
    accountId: state?.account.account?.accountId,
    token: state?.auth.token,
    phoneNumber: state?.auth.user?.phoneNumber,
  }
}
