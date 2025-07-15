//input.js

// Define e captura as teclas apertadas e armazena no objeto keys
const keys = {};
document.addEventListener("keydown", (e) => (keys[e.code] = true));
document.addEventListener("keyup", (e) => (keys[e.code] = false));
export { keys };
