import { Dispatch } from 'redux'
import { ApiResponse } from '_config/api'
import { HttpClient } from '_config/http'
import { getBaseRequestData } from '_utils/http'
import { GetTagsRequest } from './models/request/getTags'
import { TagResponse } from './models/response/getTags'
import { GetState } from 'redux/state'

import {
  TagActions,
  GetTagsStartAction,
  GetTagsSuccessAction,
  GetTagsFailAction,
} from './actionTypes'
import { ConfigProvider } from '_config/configProvider'

export const getTags = () => {
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      dispatch<GetTagsStartAction>({
        type: TagActions.GET_TAGS_START,
      })

      const state = getState()

      const { url, defaultHeaders, accountId, accountTaxId, userId, token } =
        await getBaseRequestData('/Tag/FindSuggestionTagList', state)

      const tagAmount = ConfigProvider.config.tagAmount

      const data: GetTagsRequest = {
        userId: userId!,
        accountId: accountId!,
        taxId: accountTaxId,
        tagAmount,
      }

      const response = await HttpClient.post<TagResponse>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      const responseData = response.data.data

      dispatch<GetTagsSuccessAction>({
        type: TagActions.GET_TAGS_SUCESS,
        payload: responseData.tags,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<GetTagsFailAction>({
        type: TagActions.GET_TAGS_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }
}
