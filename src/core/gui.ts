import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'

// Debug
export const gui = new Pane()
gui.registerPlugin(EssentialsPlugin)

export const fpsGraph = gui.addBlade({
  view: 'fpsgraph',
  label: 'fpsgraph',
})
