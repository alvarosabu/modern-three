import { BladeApi, Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import { BladeController, View } from '@tweakpane/core'

interface FPSGraph extends BladeApi<BladeController<View>> {
  begin(): void
  end(): void
}
// Debug
export const gui = new Pane()
gui.registerPlugin(EssentialsPlugin)

export const fpsGraph = gui.addBlade({
  view: 'fpsgraph',
  label: 'fpsgraph',
}) as FPSGraph
