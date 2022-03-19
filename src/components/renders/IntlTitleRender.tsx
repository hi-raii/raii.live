import React, {ReactNode} from 'react'
import Render, {RenderFunction} from "./Render";
import assert from "assert";

type Params = {
  id: string,
  messages: Record<string,ReactNode>,
  defaultValue: string
  render: Render<Props>
}

type Props = {
  title: string
}

const IntlTitleRender: RenderFunction<Params, Props> = ({id, defaultValue, messages}) => {
  const title = messages[id] || defaultValue;
  assert(title, "'title' must be a 'string'")
  return <title>{title}</title>
}

export default IntlTitleRender;