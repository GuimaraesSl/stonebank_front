import React, { useRef, useLayoutEffect } from 'react'
import { usePrevious } from 'hooks/usePrevious'

export interface SingleOTPInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  focus?: boolean
}
export const SingleOTPInputComponent: React.FC<SingleOTPInputProps> = ({
  focus,
  autoFocus,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const prevFocus = usePrevious(!!focus)
  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus()
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus()
        inputRef.current.select()
      }
    }
  }, [autoFocus, focus, prevFocus])
  return <input ref={inputRef} {...rest} title="input" placeholder="" />
}
