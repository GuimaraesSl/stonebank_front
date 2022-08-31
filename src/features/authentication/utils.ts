import { ConfigProvider } from '_config/configProvider'
import { HttpClient } from '_config/http'

const CryptoJS = require("crypto-js");

export async function getApplicationToken() {

  // let key = { applicationKey: ConfigProvider.config.application.key, expirationDate: new Date(new Date().setMinutes(new Date().getMinutes() + 1)) }

  // let encryptedKey = CryptoJS.AES.encrypt(JSON.stringify(key), ConfigProvider.config.application.aesKey, {
  //   iv: ConfigProvider.config.application.aesIV,
  //   mode: CryptoJS.mode.CBC,
  //   padding: CryptoJS.pad.Pkcs7
  // }).toString();

  const { key } = ConfigProvider.config.application
  const url = `${ConfigProvider.config.api.baseUrl}/auth`
  
  const response = await HttpClient.get(url, {
    headers: {
      ...ConfigProvider.config.api.defaultHeaders,
      // 'x-application-key': encryptedKey
      'x-application-key': key
    },
  })

  return {
    // 'x-application-key': encryptedKey,
    'x-application-key': key,
    'x-application-token': response.headers['x-application-token'],
  }
}

export const validateToken = (token: string) => {
  if (!token) return false

  const decoded: any = JSON.parse(atob(token.split('.')[1]))
  const exp = decoded.exp * 1000

  return Date.now() < exp
}