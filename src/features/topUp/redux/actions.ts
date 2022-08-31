import {
  GenerateTopUpFailAction,
  GenerateTopUpStartAction,
  GenerateTopUpSuccessAction,
  TopUpActions,
  UpdateTopUpDataAction,
  GetTopUpProductsStartAction,
  GetTopUpProductsSuccessAction,
  GetTopUpProductsFailAction,
  GetTopUpPeriodicStartAction,
  GetTopUpPeriodicSuccessAction,
  GetTopUpPeriodicFailAction,
  CloseAlertAction,
} from './actionTypes'
import { Dispatch } from 'redux'
import { TopUp } from './models/topUp'
import { GetState } from 'redux/state'
import { getBaseRequestData } from '_utils/http'
import { HttpClient } from '_config/http'
import { ApiResponse } from '_config/api'
import { GenerateTopUpRequest } from './models/request/generateTopUp'
import { GenerateTopUpResponse } from './models/response/generateTopUp'
import { GetTopUpProductListByPhoneNumberResponse } from './models/response/getTopUpProductListByPhoneNumber'
import { GetTopUpProductListByPhoneNumberRequest } from './models/request/getTopUpProductListByPhoneNumber'
import { GetTopUpPeriodicList } from './models/request/getTopUpPeriodicList'

export const updateTopUpData = (topUp?: TopUp) => (dispatch: Dispatch) => {
  dispatch<UpdateTopUpDataAction>({
    type: TopUpActions.UPDATE_TOP_UP_DATA,
    payload: topUp,
  })
}

export const getTopUpPeriodic =
  () => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<GetTopUpPeriodicStartAction>({
      type: TopUpActions.GET_PERIODIC_TOP_UP_START,
    })

    try{
      const state = getState()
      const requestToken = state.auth.token
      
      const{ url, defaultHeaders, accountId, userId} = 
      await getBaseRequestData('/TopUp/FindTopUpPeriodicList', state)

      const data: GetTopUpPeriodicList = {
        accountId: accountId!,
        userId: userId!
      }

      const response =
      await HttpClient.post<TopUp[]>(
        url,
        data,
        {
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${requestToken}`,
          },
        },
      )
      const result = response.data.data

      dispatch<GetTopUpPeriodicSuccessAction>({
        type: TopUpActions.GET_PERIODIC_TOP_UP_SUCCESS,
        payload: result,
      })
    }catch (error: any){
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<GetTopUpPeriodicFailAction>({
        type: TopUpActions.GET_PERIODIC_TOP_UP_FAIL,
        payload: response?.message ?? error.message,
      })
    }  
}

export const getTopUpProductListByPhoneNumber =
  (phoneNumber: string) => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<GetTopUpProductsStartAction>({
      type: TopUpActions.GET_TOP_UP_PRODUCTS_START,
    })
    try {
      const state = getState()

      const { url, defaultHeaders, accountId, userId } =
        await getBaseRequestData(
          '/TopUp/FindTopUpProductListByPhoneNumber',
          state,
        )

      const requestToken = state.auth.token

      const data: GetTopUpProductListByPhoneNumberRequest = {
        userId: userId!,
        accountId: accountId!,
        phoneNumber: phoneNumber,
        productSubType: Number(phoneNumber.substring(1, 3)),
      }

      const response =
        await HttpClient.post<GetTopUpProductListByPhoneNumberResponse>(
          url,
          data,
          {
            headers: {
              ...defaultHeaders,
              Authorization: `Bearer ${requestToken}`,
            },
          },
        )

      const responseData = response.data.data

      dispatch<GetTopUpProductsSuccessAction>({
        type: TopUpActions.GET_TOP_UP_PRODUCTS_SUCCESS,
        payload: {
          originNSU: responseData.originNSU,
          topUpPhoneNumberList: responseData.topUpPhoneNumberList,
        },
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<GetTopUpProductsFailAction>({
        type: TopUpActions.GET_TOP_UP_PRODUCTS_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const generateTopUp =
  () => async (dispatch: Dispatch, getState: GetState) => {
    try {
      dispatch<GenerateTopUpStartAction>({
        type: TopUpActions.GENERATE_TOP_UP_START,
      })

      const state = getState()
      const TopUpData: TopUp = state.topUp.topUp!

      const { url, defaultHeaders, token, accountId, userId } =
        await getBaseRequestData('/TopUp', state)

      const data: GenerateTopUpRequest = {
        accountId: accountId!,
        userId: userId!,
        productType: TopUpData.topUpProduct!.productType,
        batchIdentifier: TopUpData.topUpProduct!.batchIdentifier,
        productKey: TopUpData.topUpProduct!.productKey,
        productValue: TopUpData.topUpProduct!.productValue,
        contractIdentifier: TopUpData.phoneNumber!,
        originNSU: TopUpData.originNSU!,
        tags: TopUpData.tags!,
        periodicRepetition: TopUpData.periodicRepetition!,
        topUpDate: TopUpData.topUpDate!,
        isRecurrent: TopUpData.isRecurrent!,
      }

      await HttpClient.post<GenerateTopUpResponse>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch<GenerateTopUpSuccessAction>({
        type: TopUpActions.GENERATE_TOP_UP_SUCCESS,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<GenerateTopUpFailAction>({
        type: TopUpActions.GENERATE_TOP_UP_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const closeAlert = () => (dispatch: Dispatch) => {
  dispatch<CloseAlertAction>({
    type: TopUpActions.CLOSE_ALERT,
  })
}
