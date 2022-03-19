export type RenderFunction<Params extends RenderParams<Props>, Props> = (params : Params)=>JSX.Element

type RenderParams<Props> = {
  render: Render<Props>
}

type Render<Props> = (props: Props)=>JSX.Element

export default Render;