import { combineReducers } from 'redux'
import { accountReducer } from 'features/account/redux/reducer'
import { cardReducer } from 'features/card/redux/reducer'
import { authReducer } from 'features/authentication/redux/reducer'
import { initialStoreState, StoreState } from './state'
import { AuthAction } from 'features/authentication/redux/actionTypes'
import { userInformationReducer } from 'features/user/redux/reducer'
import { tagReducer } from 'features/tags/redux/reducer'
import { QrCodeTransferReducer } from 'features/qrCodeTransfer/redux/reducer'
import { transferenceReducer } from 'features/transference/redux/reducer'
import { paymentReducer } from 'features/payment/redux/reducer'
import { activateOnboardingReducer } from 'features/onboarding/redux/reducer'
import { topUpReducer } from 'features/topUp/redux/reducer'
import { taxPaymentReducer } from 'features/taxPayment/redux/reducer'
import { smsTransferReducer } from 'features/smsTransfer/redux/reducer'
import { futureTransactionsReducer } from 'features/schedulePayments/redux/reducer'
import { pixReducer } from 'features/pix/redux/reducer'

export const appReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  userInformation: userInformationReducer,
  tags: tagReducer,
  payment: paymentReducer,
  qrCodeTransfer: QrCodeTransferReducer,
  transference: transferenceReducer,
  card: cardReducer,
  onboarding: activateOnboardingReducer,
  topUp: topUpReducer,
  taxPayment: taxPaymentReducer,
  smsTransfer: smsTransferReducer,
  futureTransactions: futureTransactionsReducer,
  pix: pixReducer,
})

export const rootReducer = (
  state: StoreState = initialStoreState,
  action: any,
): StoreState => {
  if (action.type === AuthAction.SIGNOUT_FINISH) return initialStoreState

  return appReducer(state, action)
}
