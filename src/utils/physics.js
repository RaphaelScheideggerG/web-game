// physics.js

import { player } from "../entities/Player.js";
import { Map } from "../core/Map.js";

export function update_physics() {
  // Atrito
  player.speed.x *= player.friction;

  // Gravidade
  player.speed.y += player.gravity;

  // Colisão com o chão
  if (player.position.y + player.height > Map.groundy) {
    player.position.y = Map.groundy - player.height;
    player.speed.y = 0;
    player.grounded = true;
    player.jumpcount = 2;
  }

  // Velocidade terminal
  if (player.speed.y >= player.vterminal) {
    player.speed.y = player.vterminal;
  }
}
