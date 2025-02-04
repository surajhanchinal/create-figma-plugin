import { ComponentChildren, h, JSX } from 'preact'

import { Props } from '../../types/types.js'
import style from './preview.module.css'

export type PreviewProps = {
  children: ComponentChildren
}

export function Preview({
  children,
  ...rest
}: Props<HTMLDivElement, PreviewProps>): JSX.Element {
  return (
    <div {...rest} class={style.preview}>
      {children}
    </div>
  )
}
