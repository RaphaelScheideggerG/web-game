//player.js

import { Keys } from "../utils/input.js";
import { JustPressed } from "../utils/input.js";
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
  jumpCooldown: 15,
  aim:{
  x: 0,
  y: 0,
  },
  lastAim:{
  x: 0,
  y: 0,
  },
  bullets: [],
  charging: false,
  cooldown: 0,

  drawPlayer() {
    Canvas.ctx.fillStyle = "#0f0";
    Canvas.ctx.fillRect(player.position.x, player.position.y, player.width, player.height);
  },
};

export function update_player() {
  player.drawPlayer();
  // Verifica as teclas pressinadas
  if (Keys["KeyD"]) {
    player.speed.x = player.vel
  };
  if (Keys["KeyA"]) {
    player.speed.x = -player.vel
  };

  // Parada brusca
  if (Keys["KeyD"] && Keys["KeyA"]) {
    player.speed.x = 0;
    //console.log("ParadaBrusca")
  }

  // Pulo duplo //
  if (JustPressed["Space"] && player.jumpcount > 0){
    player.speed.y = player.jumpforce;
    player.jumpcount--;
    player.grounded = false;
  }

  // Pulo controlado //
  // /*
  if (!Keys["Space"] && !player.grounded) {
    if (player.speed.y < 0) {
      player.speed.y *= 0.5;
    }
    player.jumpable = true;
  }
  // */

  // Mira && Ultima mira
  // eixo x
  if (Keys["KeyD"]) {
    player.aim.x = 1;
    player.lastAim.x = 1;
    //console.log("keyD lastx")
  } else {player.aim.x = 0;}
  if (Keys["KeyA"]) {
    player.aim.x = -1;
    player.lastAim.x = -1;
    //console.log("keyA")
  }
  // eixo y
  if (Keys["KeyW"]) {
    player.aim.y = -1;
    player.lastAim.y = -1;
    //console.log("KeyW")
  }else {player.aim.y = 0;}
  if (Keys["KeyS"]) {
    player.aim.y = 1;
    player.lastAim.y = 1;
    //console.log("KeyS")
  }

  // Atualiza a posição do player
  player.position.x += player.speed.x;
  player.position.y += player.speed.y;

  // player can shoot

  // Disparo e criação dos projéteis
  if (JustPressed["KeyJ"] && !player.charging) {
    player.bullets.push(new Bullet());
    player.charging = true;
  } 
  if (!Keys["KeyJ"]) {
    player.charging = false;
    for (let bullet of player.bullets) {
      if (!bullet.fired) {
        bullet.fired = true;
      }
    }
  }

  for (let bullet of player.bullets) {
    if (!bullet.fired && player.charging) {
      bullet.charge();
    }

    if (bullet.fired) {
      bullet.shoot();
    }
  }
 
  // Debug
  console.log(
    " X:",player.position.x, "\n",
    "y:",player.position.y, "\n",
    "JumpCount:",player.jumpcount, "\n",
    "Grounded:",player.grounded, "\n"
  )
}
