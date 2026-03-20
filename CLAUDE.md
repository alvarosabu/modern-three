# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Modern ThreeJS is a functional 3D graphics boilerplate using Three.js with Vite. It serves as a starting point for 3D web projects, featuring shader support, debug UI, and modern TypeScript configuration.

## Commands

```bash
pnpm dev          # Development server (localhost:3000)
pnpm build        # TypeScript check + Vite build
pnpm lint         # Run ESLint
pnpm lint:fix     # Auto-fix linting issues
pnpm preview      # Preview production build
```

## Architecture

### Core Systems (src/core/)

- **renderer.ts**: Creates WebGLRenderer, Scene, and canvas element. Exports `renderer`, `scene`, and `canvas`.
- **camera.ts**: PerspectiveCamera setup with window resize handling. Exports `camera`.
- **gui.ts**: Tweakpane debug panel with FPS graph monitor. Exports `pane` and `fpsGraph`.
- **orbit-control.ts**: OrbitControls for camera interaction with damping. Exports `controls`.

### Main Application (src/main.ts)

Entry point that:
- Sets up lighting (ambient + directional with shadows)
- Creates geometries and materials
- Implements shader-based animated sphere using custom GLSL
- Runs the animation loop updating shader uniforms (`uTime`, `uFrequency`)

### Shaders (src/shaders/)

GLSL files loaded via `vite-plugin-glsl`. Import as strings:
```typescript
import vertexShader from '/@/shaders/vertex.glsl'
```

## Key Patterns

- **Functional architecture**: No classes. Core modules export initialized objects directly.
- **Path alias**: `/@/` maps to `./src/` for cleaner imports
- **Real-time animation**: Uses Three.js Clock for delta time in the render loop
- **Debug UI binding**: Tweakpane bound directly to object properties (camera position, light settings)
- **Shader uniforms**: Updated each frame via `material.uniforms.uTime.value`

## TypeScript Configuration

- `moduleResolution: "bundler"` (Vite-optimized)
- Strict mode with `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`
- Types included: `vite/client`, `three`, `tweakpane`, `three/tsl`, `three/webgpu`

## Code Style

- Uses `@alvarosabu/eslint-config` (no semicolons)
- ES modules throughout
- Canvas element requires `id="webgl"` in index.html
