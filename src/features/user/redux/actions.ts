import { Dispatch } from 'redux'
import { GetState } from 'redux/state'
import { ApiResponse } from '_config/api'
import { HttpClient } from '_config/http'
import { getBaseRequestData } from '_utils/http'
import {
  GetUserInformationFailAction,
  GetUserInformationStartAction,
  GetUserInformationSuccessAction,
  UpdateUserInformationFailAction,
  UpdateUserInformationStartAction,
  UpdateUserInformationSuccessAction,
  UserInformationAction,
} from './actionTypes'
import { GetUserInformationRequest } from './models/request/getUserInformationRequest'
import { GetUserInformationResponse } from './models/response/getUserInformationResponse'
import { UpdateUserInformationRequest } from './models/request/updateUserInformationRequest'
import { UpdateUserInformationResponse } from './models/response/updateUserInformationResponse'
import { UserInformation } from './models/UserInformation'

export const getUserInformation =
  () => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<GetUserInformationStartAction>({
      type: UserInformationAction.GET_USER_INFORMATION_START,
    })

    try {
      const state = getState()

      const { url, accountId, userId, defaultHeaders, token } =
        await getBaseRequestData('/User/FindUserInformation', state)

      const data: GetUserInformationRequest = { userId, accountId }

      const response = await HttpClient.post<GetUserInformationResponse>(
        url,
        data,
        { headers: { ...defaultHeaders, Authorization: `Bearer ${token}` } },
      )

      const responseData = response.data.data

      dispatch<GetUserInformationSuccessAction>({
        type: UserInformationAction.GET_USER_INFORMATION_SUCCESS,
        payload: responseData,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<GetUserInformationFailAction>({
        type: UserInformationAction.GET_USER_INFORMATION_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const updateUserInformation =
  (updateData: UserInformation) =>
  async (dispatch: Dispatch, getState: GetState) => {
    dispatch<UpdateUserInformationStartAction>({
      type: UserInformationAction.UPDATE_USER_INFORMATION_START,
    })

    try {
      const state = getState()
      const userInformation = state.userInformation.userInformation
      const { url, userId, accountId, defaultHeaders, token } =
        await getBaseRequestData('/User/UpdateUserInformation', state)

      const data: UpdateUserInformationRequest = {
        accountId,
        userId,
        name: updateData.name ?? userInformation?.name,
        mail: updateData.mail ?? userInformation?.mail,
        phoneNumber: updateData.phoneNumber ?? userInformation?.phoneNumber,
        zipCode: updateData.zipCode ?? userInformation?.zipCode,
        street: updateData.street ?? userInformation?.street,
        number: updateData.number ?? userInformation?.number,
        district: updateData.district ?? userInformation?.district,
        complement: updateData.complement ?? userInformation?.complement,
        city: updateData.city ?? userInformation?.city,
        state: updateData.state ?? userInformation?.state,
        reference: updateData.reference ?? userInformation?.reference,
        country: updateData.country ?? userInformation?.country,
      }

      await HttpClient.post<UpdateUserInformationResponse>(url, data, {
        headers: { ...defaultHeaders, Authorization: `Bearer ${token}` },
      })

      dispatch<UpdateUserInformationSuccessAction>({
        type: UserInformationAction.UPDATE_USER_INFORMATION_SUCCESS,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<UpdateUserInformationFailAction>({
        type: UserInformationAction.UPDATE_USER_INFORMATION_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }
