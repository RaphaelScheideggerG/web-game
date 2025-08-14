//game.js

import { player } from "./player";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Define a resolução do canvas
canvas.width = 800;
canvas.height = 600;

const groundy = 350;
export { groundy, canvas, ctx };

export function draw() {
  // Limpa a teclas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // chão
  ctx.fillStyle = "#444";
  ctx.fillRect(0, groundy, canvas.width, canvas.height - groundy);

  // Desenha o player
  ctx.fillStyle = "#0f0";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Desenha o projetil
}
