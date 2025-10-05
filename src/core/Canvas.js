const canvas = document.getElementById("game");

// Defina o tamanho real do elemento canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// pegua o contexto
const ctx = canvas.getContext("2d");

// Exporta sincronizado
export const Canvas = {
  canvas,
  ctx,
  width: canvas.width,
  height: canvas.height
};
