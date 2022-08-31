export interface TagsState {
  tags?: string[]
  tagAmount?: number
  errorMessage?: string
  loading: boolean
}

export class InitialTagsState implements TagsState {
  tags?: string[]
  errorMessage?: string
  loading: boolean = false
}

export class LoadingTagsState implements TagsState {
  loading: boolean = true
  errorMessage?: string
  tags?: string[]
}

export class SuccessTagsState implements TagsState {
  errorMessage?: string
  loading: boolean = false
  constructor(public tags: string[]) {}
}

export class FailTagsState implements TagsState {
  loading: boolean = false
  constructor(public errorMessage: string, public tags?: string[]) {}
}
