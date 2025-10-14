// physics.js DEVE SER ATUALIZADO PARA RECEBER UMA LISTA DE OBJETOS
import { Map } from "../core/Map.js";

export function update_physics(object) {
  // Atrito
  object.speed.x *= object.friction;

  // Gravidade
  object.speed.y += object.gravity;

  // Colisão com o chão
  if (object.position.y + object.height > Map.groundy) {
    object.position.y = Map.groundy - object.height;
    object.speed.y = 0;
    object.grounded = true;
    object.jumpcount = 2;
  }

  // Velocidade terminal
  if (object.speed.y >= object.vterminal) {
    object.speed.y = object.vterminal;
  }
}
