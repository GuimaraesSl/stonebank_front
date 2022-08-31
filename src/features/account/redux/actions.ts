import { Dispatch } from 'redux'
import { ApiResponse } from '_config/api'
import { HttpClient } from '_config/http'
import {
  AccountActions,
  CloseAlertAction,
  GetAccountDashboardFailAction,
  GetAccountDashboardStartAction,
  GetAccountDashboardSuccessAction,
  GetBankStatementFailAction,
  GetBankStatementStartAction,
  GetBankStatementSuccessAction,
  GetAllAccountsFailAction,
  GetAllAccountsStartAction,
  GetAllAccountsSuccessAction,
  GetTransactionReceiptSuccessAction,
  GetTransactionReceiptFailAction,
  GetTransactionDetailsStartAction,
  GetTransactionDetailsSuccessAction,
  GetTransactionDetailsFailAction,
  GetTransactionReceiptStartAction,
  SelectAccountAction,
  SetBankStatementFiltersAction,
  ChangeAccountStartAction,
  ChangeAccountSuccessAction,
  ChangeAccountFailAction,
  FixedAccountStartAction,
  FixedAccountSuccessAction,
  FixedAccountFailAction,
  VerifyTransactionStart,
  VerifyTransactionSuccess,
} from './actionTypes'
import { AccountDashboard } from 'features/account/redux/models/dashboard'
import { GetAccountDashboardRequest } from 'features/account/redux/models/request/getAccountDashboard'
import { GetAccountDashboardResponse } from 'features/account/redux/models/response/getAccountDashboard'
import { GetState } from 'redux/state'
import { getBaseRequestData } from '_utils/http'
import { GetBankStatementResponse } from './models/response/getBankStatement'
import { GetBankStatementRequest } from './models/request/getBankStatement'
import { GetAccountByLoginResponse } from './models/response/getAccountListByLogin'
import { GetAccountListByLoginRequest } from './models/request/getAccountListByLogin'
import { TransactionReceipt } from './models/transactionReceipt'
import { GetTransactionReceiptResponse } from './models/response/getTransactionReceipt'
import { GetTransactionReceiptRequest } from './models/request/getTransactionReceipt'
import { OperationType } from './models/operationType'
import { GetTransactionDetailsRequest } from './models/request/getTransactionDetails'
import { GetTransactionDetailsResponse } from './models/response/getTransactionDetails'
import { TransactionDetails } from './models/transactionDetails'
import { BankStatementFilters } from './models/bankStatementFilters'
import { Account } from './models/account'
import { GetFixedAccountRequest } from './models/request/getFixedAccount'
import { UiFunction } from './models/uiFunction'
import { GetTransactionByOperationRequest } from './models/request/getTransactionByOperationsRequest'
import { GetTransactionByOperationResponse } from './models/response/getTransactionByOperationResponse'

export const getAccountDashboard =
  (accountId?: number) => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<GetAccountDashboardStartAction>({
      type: AccountActions.GET_ACCOUNT_DASHBOARD_START,
    })

    try {
      const {
        url,
        defaultHeaders,
        userTaxId: taxId,
        userId,
        accountId,
        token,
      } = await getBaseRequestData('/Account/FindAccountDashboard', getState())
      const data: GetAccountDashboardRequest = {
        login: taxId!,
        userId: userId!,
        accountId: accountId!,
      }

      const response = await HttpClient.post<GetAccountDashboardResponse>(
        url,
        data,
        {
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const { account, accounts, balance, uiFunctions } = response.data.data
      const convertedUiFunctions: any[] = [
        ...Array.from({ length: 18 }, (_, i) => i + 1),
      ].map(
        x => UiFunction[UiFunction[x] as keyof typeof UiFunction] as UiFunction,
      )

      const dashboard: AccountDashboard = {
        accounts,
        balance,
        uiFunctions: convertedUiFunctions,
      }

      dispatch<GetAccountDashboardSuccessAction>({
        type: AccountActions.GET_ACCOUNT_DASHBOARD_SUCCESS,
        payload: {
          account: account,
          dashboard,
        },
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<GetAccountDashboardFailAction>({
        type: AccountActions.GET_ACCOUNT_DASHBOARD_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const getBankStatement =
  (dateFilter?: number) => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<GetBankStatementStartAction>({
      type: AccountActions.GET_BANK_STATEMENT_START,
    })

    try {
      const state = getState()
      const { url, defaultHeaders, accountTaxId, token, userId, accountId } =
        await getBaseRequestData('/Account/FindBankStatement', state)

      const filters: BankStatementFilters = Object.create(
        state.account.bankStatementFilters ?? null,
      )

      if (!filters.startDate) {
        filters.startDate = new Date()
        filters.startDate.setDate(
          filters.startDate.getDate() - 30 - dateFilter!,
        )
      }

      filters.endDate = filters.endDate ?? new Date()

      const data: GetBankStatementRequest = {
        taxId: accountTaxId!,
        bank: state.account.account?.bank,
        bankBranch: state.account?.account?.bankBranch,
        bankAccount: state.account?.account?.bankAccount,
        bankAccountDigit: state.account.account?.bankAccountDigit,
        accountId: accountId!,
        startDate: filters.startDate,
        endDate: filters.endDate,
        transactionType: filters.transactionType,
        tags: filters.tags,
        userId: userId!,
        operationType: filters.operationType,
      }

      const response = await HttpClient.post<GetBankStatementResponse>(
        url,
        data,
        {
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const responseData = response.data.data
      const dayTransactionsList = responseData.transactions
      dispatch<GetBankStatementSuccessAction>({
        type: AccountActions.GET_BANK_STATEMENT_SUCCESS,
        payload: dayTransactionsList,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<GetBankStatementFailAction>({
        type: AccountActions.GET_BANK_STATEMENT_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const getTransactionDetails =
  (id: string, operationType: OperationType) =>
  async (dispatch: Dispatch, getState: GetState) => {
    dispatch<GetTransactionDetailsStartAction>({
      type: AccountActions.GET_TRANSACTION_DETAILS_START,
    })

    try {
      const state = getState()
      const { account } = state
      const { url, defaultHeaders, token, accountId, userId, taxId } =
        await getBaseRequestData('/Account/FindBankStatementDetails', state)

      const data: GetTransactionDetailsRequest = {
        accountId: accountId!,
        userId: userId!,
        externalIdentifier: id,
        operationType,
        taxId: taxId,
        bank: account.account?.spbBank,
        bankBranch: account.account?.spbBankBranch,
        bankAccount: account.account?.spbBankAccount,
        bankAccountDigit: account.account?.spbBankAccountDigit,
      }

      const response = await HttpClient.post<GetTransactionDetailsResponse>(
        url,
        data,
        {
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const responseData = response.data.data
      const details: TransactionDetails = {
        ...responseData,
        date: responseData.date ? new Date(responseData.date) : undefined,
        dueDate: responseData.dueDate
          ? new Date(responseData.dueDate)
          : undefined,
      }
      dispatch<GetTransactionDetailsSuccessAction>({
        type: AccountActions.GET_TRANSACTION_DETAILS_SUCCESS,
        payload: details,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<GetTransactionDetailsFailAction>({
        type: AccountActions.GET_TRANSACTION_DETAILS_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const getTransactionReceipt =
  (id: string, operationType: OperationType) =>
  async (dispatch: Dispatch, getState: GetState) => {
    dispatch<GetTransactionReceiptStartAction>({
      type: AccountActions.GET_TRANSACTION_RECEIPT_START,
    })

    try {
      const state = getState()
      const { account } = state
      const { url, defaultHeaders, token, accountId, userId, taxId } =
        await getBaseRequestData('/Account/FindBankStatementDetails', state)

      const data: GetTransactionReceiptRequest = {
        accountId: accountId!,
        userId: userId!,
        externalIdentifier: id,
        operationType,
        taxId: taxId,
        bank: account.account?.spbBank,
        bankBranch: account.account?.spbBankBranch,
        bankAccount: account.account?.spbBankAccount,
        bankAccountDigit: account.account?.spbBankAccountDigit,
      }

      const response = await HttpClient.post<GetTransactionReceiptResponse>(
        url,
        data,
        {
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const responseData = response.data.data
      const receipt: TransactionReceipt = {
        ...responseData,
        date: responseData.date ? new Date(responseData.date) : null,
      }
      dispatch<GetTransactionReceiptSuccessAction>({
        type: AccountActions.GET_TRANSACTION_RECEIPT_SUCCESS,
        payload: receipt,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<GetTransactionReceiptFailAction>({
        type: AccountActions.GET_TRANSACTION_RECEIPT_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const changeAccount =
  (newAccount: Account) => async (dispatch: Dispatch) => {
    try {
      dispatch<ChangeAccountStartAction>({
        type: AccountActions.CHANGE_ACCOUNT_START,
      })

      dispatch<ChangeAccountSuccessAction>({
        type: AccountActions.CHANGE_ACCOUNT_SUCCESS,
        payload: newAccount,
      })
    } catch (error: any) {
      dispatch<ChangeAccountFailAction>({
        type: AccountActions.CHANGE_ACCOUNT_FAIL,
        payload: 'Falha ao mudar a conta do usuário',
      })
    }
  }
export const getAccountList =
  () => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<GetAllAccountsStartAction>({
      type: AccountActions.GET_ALL_ACCOUNTS_START,
    })

    try {
      const state = getState()
      const { url, defaultHeaders, accountTaxId, token, accountId, userId } =
        await getBaseRequestData('Account/FindAllAccountsByTaxId', state)

      const data: GetAccountListByLoginRequest = {
        login: accountTaxId!,
        accountId: accountId!,
        userId: userId!,
      }

      const response = await HttpClient.post<GetAccountByLoginResponse>(
        url,
        data,
        {
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const responseData = response.data.data
      const { accounts } = responseData
      dispatch<GetAllAccountsSuccessAction>({
        type: AccountActions.GET_ALL_ACCOUNTS_SUCCESS,
        payload: accounts,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<GetAllAccountsFailAction>({
        type: AccountActions.GET_ALL_ACCOUNTS_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const selectAccount = (accountId: number) => (dispatch: Dispatch) => {
  dispatch<SelectAccountAction>({
    type: AccountActions.SELECT_ACCOUNT,
    payload: accountId,
  })
}

export const setBankStatementFilters = (
  filters: BankStatementFilters,
): SetBankStatementFiltersAction => ({
  type: AccountActions.SET_BANK_STATEMENT_FILTERS,
  payload: filters,
})

export const closeAlert = () => (dispatch: Dispatch) => {
  dispatch<CloseAlertAction>({
    type: AccountActions.CLOSE_ALERT,
  })
}

export const getFixedAccounts =
  (accountId: number, fixed: boolean) =>
  async (dispatch: Dispatch, getState: GetState) => {
    dispatch<FixedAccountStartAction>({
      type: AccountActions.FIXED_ACCOUNT_START,
    })
    try {
      const state = getState()
      const { url, defaultHeaders, token, userId } = await getBaseRequestData(
        '/Account/FixingChange',
        state,
      )

      const data: GetFixedAccountRequest = {
        isFixed: fixed,
        accountId: accountId!,
        userId: userId!,
      }

      const response = await HttpClient.put<any>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.data.success) throw new Error(response.data.message)

      dispatch<FixedAccountSuccessAction>({
        type: AccountActions.FIXED_ACCOUNT_SUCCESS,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data
      dispatch<FixedAccountFailAction>({
        type: AccountActions.FIXED_ACCOUNT_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const verifyPixTransaction =
  (operationId: number, operationType: OperationType) =>
  async (dispatch: Dispatch, getState: GetState) => {
    dispatch<VerifyTransactionStart>({
      type: AccountActions.VERIFY_TRANSACTION_START,
    })

    const state = getState()
    const { url, defaultHeaders, token } = await getBaseRequestData(
      '/Account/FindAccountOperation',
      state,
    )

    const data: GetTransactionByOperationRequest = {
      operationId: operationId,
      operationType: operationType,
    }

    while (state.account.verifyTransaction?.externalIdentifier === null) {
      const response = await HttpClient.post<GetTransactionByOperationResponse>(
        url,
        data,
        {
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const responseData = response.data.data
      if (responseData.externalIdentifier)
        dispatch<VerifyTransactionSuccess>({
          type: AccountActions.VERIFY_TRANSACTION_SUCCESS,
        })
    }
  }
