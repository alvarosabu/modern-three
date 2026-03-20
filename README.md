# Modern ThreeJS ⚡️

> Modern ThreeJS boilerplate powered by Vite+ & Typescript.

![Modern ThreeJS](./public/banner.png)

Live demo [here](https://modern-three.alvarosaburido.dev/)

## Features

- Powered with [Vite+](https://vite.dev/) 📦
- GUI controls using [Tweakpane](https://cocopon.github.io/tweakpane/) 🎛
- Typescript 🦾
- No classes, just factories 🎯
- Shader support (glsl) with [vite-plugin-glsl](https://github.com/UstymUkhman/vite-plugin-glsl) 🎨
- Optimized production build — `three` and `tweakpane` split into separate vendor chunks for better caching

## You can help me keep working on this project 💚

- [Become a Sponsor on GitHub](https://github.com/sponsors/alvarosabu)
- [One-time donation via PayPal](https://paypal.me/alvarosaburido)

## Check it out

You can create a repo with this template [here](https://github.com/alvarosabu/modern-three/generate)

Or if you prefer to do it manually with the cleaner git history

```bash
npx degit alvarosabu/modern-three my-awesome-three
cd my-awesome-three
pnpm i # If you don't have pnpm installed, run: npm install -g pnpm
```

### Use it

```bash
pnpm dev
```

This will serve the app at [http://localhost:5173](http://localhost:5173)

### Build it

```bash
pnpm build
```

Builds the app for production to the `dist` folder. The build is minified, filenames include hashes, and vendor libraries (`three`, `tweakpane`) are split into separate chunks for efficient browser caching.
