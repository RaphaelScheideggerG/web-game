//player.js

import { keys } from "./input";

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
  document.addEventListener("keyup", (e) => {
    if (e.code === "Space") {
      if (player.vely < 0) {
        player.vely *= 0.4;
      }
      player.jumpable = true;
    }
  });

  // Atualiza a posição do player
  player.x += player.velx;
  player.y += player.vely;
  player.grounded = false;

  // Debug
  console.log(
    /*"ArrowLeft:",
      keys["ArrowLeft"],
      "ArrowRight:",
      keys["ArrowRight"]*/
    "jumpcount:",
    player.jumpcount
  );
}
