import pkg from '../package.json'

const threejs = document.querySelector('#threejs-version')

if (threejs) {
  threejs.textContent = `ThreeJS ${pkg.dependencies.three}`
}
