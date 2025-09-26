// physics.js

import { player } from "./player";
import { groundy } from "../core/Map";

export function update_physics() {
  // Atrito
  player.velx *= player.friction;

  // Gravidade
  player.vely += player.gravity;

  // Colisão com o chão
  if (player.y + player.height > groundy) {
    player.y = groundy - player.height;
    player.vely = 0;
    player.grounded = true;
    player.jumpcount = 2;
  }

  // Velocidade terminal
  if (player.vely >= player.vterminal) {
    player.vely = player.vterminal;
  }
}
