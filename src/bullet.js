import { player } from "./player";

export class Bullet {
  constructor(x, y, velx, velmax, rad, radmax) {
    this.x = player.lastx;
    this.y = player.lasty;
  }
  // Charge mechanic
  charge() {
    document.addEventListener("keydown", (e) => (keys[e.code] = true));
    if (e.code === "j") {
      // Tamanho
      rad += 0.1;

      // Velocidade
      if (velx < velmax && vely < velmax) {
        velx += 0.1;
        vely += 0.1;
      }

      // drawbullet
      function drawbullet() {
        ctx.arc(player.x, player.x, rad, 0, 2 * Math.PI, false);
      }
    }
  }
}
