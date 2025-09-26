const canvas = document.getElementById("game");

// Defina o tamanho real do elemento canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Agora sim, pegue o contexto
const ctx = canvas.getContext("2d");

// Exporte tudo sincronizado
export const Canvas = {
  canvas,
  ctx,
  width: canvas.width,
  height: canvas.height
};