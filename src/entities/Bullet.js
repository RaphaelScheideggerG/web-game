import { player } from "./Player.js";
import { Canvas } from "../core/game.js";

export class Bullet {
  constructor() {
    this.direction = {
      x: player.lastx,
      y: player.lasty,
    };
    this.position = {
      x: player.position.x + 50 * this.direction.x,
      y: player.position.y + 50 * this.direction.y,
    };
    this.power = 0;
    this.maxPower = 180; // 3s em 60 fps
    this.speed = { x: 0, y: 0 };
    this.fired = false;
  }
  drawBullet() {
    this.position.x = player.position.x + 50 * this.direction.x; // Atualiza posição
    this.position.y = player.position.y + 50 * this.direction.y; // Idem mas para eixo y
    Canvas.ctx.fillStyle = "#ff0"; // cor da bala
    Canvas.ctx.beginPath();
    Canvas.ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
    Canvas.ctx.fill();
  }

  charge() {
    // Etapa de carregamento do projétil (tecla segurada)
    if (this.power < 180) {
      // 3 seg para atingir 180
      this.power++;
    }
    const vel = Math.max(power / 18, 5); // vel min de 5, a maxima já é 10
    this.speed.x =
      Math.cos(Math.atan(this.direction.y / this.direction.x)) * vel;
    this.speed.y =
      Math.sin(Math.atan(this.direction.y / this.direction.x)) * vel;
    this.drawBullet();
  }

  shoot() {
    // Etapa de lançamento do projétil (soltura da tecla)
    this.fired = true;
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    this.drawBullet();
  }
}
