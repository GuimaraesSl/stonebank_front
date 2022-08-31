import { TagActions, TagAction } from './actionTypes'
import {
  TagsState,
  InitialTagsState,
  SuccessTagsState,
  FailTagsState,
  LoadingTagsState,
} from './state'

const initialState: TagsState = new InitialTagsState()

export const tagReducer = (state = initialState, action: TagAction) => {
  switch (action.type) {
    case TagActions.GET_TAGS_START:
      return new LoadingTagsState()

    case TagActions.GET_TAGS_SUCESS:
      return new SuccessTagsState(action.payload)

    case TagActions.GET_TAGS_FAIL:
      return new FailTagsState(action.payload, state.tags)

    default:
      return state
  }
}
