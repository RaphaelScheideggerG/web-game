import { player } from "./Player.js";
import { Canvas } from "../core/Canvas.js";

export class Bullet {
  constructor() {
    if (player.aim.x == 0 && player.aim.y == 0){
      this.direction = {
        x: player.lastAim.x,
        y: player.aim.y,
      };
    } else{
      this.direction = {
        x: player.aim.x,
        y: player.aim.y,
      }
    }
    this.position = {
      x: player.position.x + 50 * this.direction.x,
      y: player.position.y + 50 * this.direction.y,
    };
    this.power = 0;
    this.speed = { x: 0, y: 0 };
    this.fired = false;
  }
  
  drawBullet() {
    if (player.aim.x == 0 && player.aim.y == 0){
      this.direction = {
        x: player.lastAim.x,
        y: player.aim.y,
      };
    } else{
      this.direction = {
        x: player.aim.x,
        y: player.aim.y,
      }
    }

    if (!this.fired){
      this.position.x = player.width/2 + player.position.x + 30 * this.direction.x; // Atualiza posição
      this.position.y = player.height/2 + player.position.y + 30 * this.direction.y; // Idem mas para eixo y
      Canvas.ctx.fillStyle = "rgba(255, 0, 0, 1)"; // cor da bala
      Canvas.ctx.beginPath();
      Canvas.ctx.arc(this.position.x, this.position.y, Math.max(5 * this.power/60, 5), 0, Math.PI * 2);
      Canvas.ctx.fill();
    } else{
      Canvas.ctx.fillStyle = "rgba(255, 0, 0, 1)";
      Canvas.ctx.beginPath();
      Canvas.ctx.arc(this.position.x, this.position.y, Math.max(5 * this.power/60, 5), 0, Math.PI * 2);
      Canvas.ctx.fill();
    }
  }

  charge() {
    this.drawBullet();
    // Etapa de carregamento do projétil (tecla segurada)
    if (this.power < 180) {
      // 3 seg para atingir 180
      this.power++;
      this.power++; // Ignore a gambiarra, isso é só um teste 😂
      this.power++;
    }
    const vel = Math.max(this.power / 18, 6); // vel min de 5, a maxima já é 10 pelo if (this.power < 180)
    this.speed.x = this.direction.x * vel;
    this.speed.y = this.direction.y * vel;

  }

  shoot() {
    this.drawBullet();
    // Etapa de lançamento do projétil (soltura da tecla)
    this.fired = true;
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }
}
