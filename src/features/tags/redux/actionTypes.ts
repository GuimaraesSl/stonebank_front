export enum TagActions {
  GET_TAGS_START = 'GET_TAGS_START',
  GET_TAGS_SUCESS = 'GET_TAGS_SUCCESS',
  GET_TAGS_FAIL = 'GET_TAGS_FAIL',
}

export interface GetTagsStartAction {
  type: TagActions.GET_TAGS_START
}

export interface GetTagsSuccessAction {
  type: TagActions.GET_TAGS_SUCESS
  payload: string[]
}

export interface GetTagsFailAction {
  type: TagActions.GET_TAGS_FAIL
  payload: string
}

export type TagAction =
  | GetTagsStartAction
  | GetTagsSuccessAction
  | GetTagsFailAction
