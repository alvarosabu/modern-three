import type { BladeController, View } from '@tweakpane/core'
import type { BladeApi } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import { Pane } from 'tweakpane'

interface FPSGraph extends BladeApi<BladeController<View>> {
  begin: () => void
  end: () => void
}

export const createGUI = () => {
  const pane = new Pane()
  pane.registerPlugin(EssentialsPlugin)

  const fpsGraph = pane.addBlade({ view: 'fpsgraph', label: 'fps' }) as FPSGraph

  return {
    pane,
    fpsGraph,
    dispose: () => pane.dispose(),
  }
}
