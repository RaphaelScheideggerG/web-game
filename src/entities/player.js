//player.js

import { keys } from "./input";
import { Bullet } from "./bullet";

// Define objeto player
export const player = {
  x: 50,
  y: 300,
  width: 50,
  height: 50,
  velx: 0,
  vely: 0,
  speed: 5,
  jumpforce: -12,
  grounded: false,
  gravity: 0.6,
  friction: 0.7,
  jumpcount: 2,
  vterminal: 20,
  jumpable: true,
  lastx: 1,
  lasty: 0,
  bullets: [],
  charging: false,
  chargeStartTime: 0,
};

export function update_player() {
  // Verifica as teclas pressinadas
  if (keys["KeyD"]) player.velx = player.speed;
  if (keys["KeyA"]) player.velx = -player.speed;

  // Parada brusca
  if (keys["KeyD"] && keys["KeyA"]) {
    player.velx = 0;
  }

  // Pulo duplo
  if (keys["Space"] && player.jumpcount > 0 && player.jumpable == true) {
    player.vely = player.jumpforce;
    player.grounded = false;
    keys["Space"] = false;
    player.jumpcount -= 1;
    player.jumpable = false;
  }

  // Pulo controlado
  if (!keys["Space"] && !player.jumpable && player.jumpcount < 2) {
    if (player.vely < 0) {
      player.vely *= 0.4;
    }
    player.jumpable = true;
  }

  // Ultima direção
  // eixo x
  if (player.velx > 0) {
    player.lastx = 1;
  } else if (player.velx < 0) {
    player.lastx = -1;
  }
  // eixo y
  if (player.vely > 0) {
    player.lasty = 1;
  } else if (player.vely < 0) {
    player.lastx = -1;
  }

  // Atualiza a posição do player
  player.x += player.velx;
  player.y += player.vely;
  player.grounded = false;

  // Disparo e criação dos projéteis
  if (keys["KeyJ"]) {
    player.bullets.append(new Bullet());
  }

  // Atualiza todos os projéteis na lista
  for (let bulet of player.bullets) {
    // Tamanho
    bulet.rad += 0.1;

    // Velocidade
    if (bulet.velx < bulet.velmax && bulet.vely < bulet.velmax) {
      bulet.velx += 0.1;
      bulet.vely += 0.1;
    }

    // Desenho do projétil -> Codigo antigo, deve ser atualizado
    function drawbullet() {
      ctx.arc(player.x, player.x, rad, 0, 2 * Math.PI, false);
    }
  }

  // Debug
  /*console.log(
    "ArrowLeft:",
      keys["ArrowLeft"],
      "ArrowRight:",
      keys["ArrowRight"]
    "jumpcount:",
    player.jumpcount
  );*/
}
