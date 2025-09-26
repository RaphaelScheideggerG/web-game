//player.js

import { Keys } from "./input.js";
import { Bullet } from "./Bullet.js";
import { Canvas } from "../core/Canvas.js";

// Define objeto player
export const player = {
  position: {
    x: 50,
    y: 300,
  },
  width: 50,
  height: 50,
  speed: {
    x: 0,
    y: 0,
  },
  vel: 5,
  jumpforce: -12,
  grounded: false,
  gravity: 0.6,
  friction: 0.7,
  jumpcount: 2,
  vterminal: 20,
  jumpable: true,
  lastx: 1,
  lasty: 1,
  bullets: [],
  charging: false,
  cooldown: 0,

  drawPlayer() {
    Canvas.ctx.fillStyle = "#0f0";
    Canvas.ctx.fillRect(player.position.x, player.position.y, player.width, player.height);
  },
};

export function update_player() {
  // Verifica as teclas pressinadas
  if (Keys["KeyD"]) player.speed.x = player.vel;
  if (Keys["KeyA"]) player.speed.y = -player.vel;

  // Parada brusca
  if (Keys["KeyD"] && Keys["KeyA"]) {
    player.speed.x = 0;
  }

  // Pulo duplo
  if (Keys["Space"] && player.jumpcount > 0 && player.jumpable == true) {
    player.speed.y = player.jumpforce;
    player.grounded = false;
    Keys["Space"] = false;
    player.jumpcount -= 1;
    player.jumpable = false;
  }

  // Pulo controlado
  if (!Keys["Space"] && !player.jumpable && player.jumpcount < 2) {
    if (player.speed.y < 0) {
      player.speed.y *= 0.4;
    }
    player.jumpable = true;
  }

  // Ultima direção
  // eixo x
  if (Keys["d"]) {
    player.lastx = 1;
  }
  if (Keys["a"]) {
    player.lastx = -1;
  }
  // eixo y
  if (Keys["w"]) {
    player.lasty = 1;
  }
  if (Keys["s"]) {
    player.lastx = -1;
  }

  // Atualiza a posição do player
  player.x += player.speed.x;
  player.y += player.speed.y;
  player.grounded = false;

  // player can shoot

  // Disparo e criação dos projéteis
  if (Keys["j"] && !player.charging) {
    player.bullets.push(new Bullet());
    player.charging = true;
  } else {
    player.charging = false;
  }

  for (let bullet of player.bullets) {
    if (!bullet.fired && player.charging) {
      bullet.charge();
    }

    if (bullet.fired || !player.charging) {
      bullet.shoot();
    }
  }

  player.drawPlayer();
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
