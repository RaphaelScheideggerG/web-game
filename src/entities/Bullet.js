import { Canvas } from "../core/Canvas.js";

export class Bullet {
  Player = {}

  constructor(player) {
    this.Player = player
    if (this.Player.aim.x == 0 && this.Player.aim.y == 0){
      this.direction = {
        x: this.Player.lastAim.x,
        y: this.Player.aim.y,
      };
    } else{
      this.direction = {
        x: this.Player.aim.x,
        y: this.Player.aim.y,
      }
    }
    this.position = {
      x: this.Player.position.x + 50 * this.direction.x,
      y: this.Player.position.y + 50 * this.direction.y,
    };
    this.power = 1;
    this.speed = { x: 0, y: 0 };
    this.fired = false;
    this.lifeTime = 0
  }

  drawBullet() {
    if (this.Player.aim.x == 0 && this.Player.aim.y == 0){
      this.direction = {
        x: this.Player.lastAim.x,
        y: this.Player.aim.y,
      };
    } else {
      this.direction = {
        x: this.Player.aim.x,
        y: this.Player.aim.y,
      }
    }

    if (!this.fired){
      this.position.x = this.Player.width/2 + this.Player.position.x + 30 * this.direction.x; // Atualiza posição
      this.position.y = this.Player.height/2 + this.Player.position.y + 30 * this.direction.y; // Idem mas para eixo y
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
      this.power+= 3;
    }
    const vel = Math.max(this.power / 18, 6); // vel min de 5, a maxima já é 10 pelo if (this.power < 180)
    let magnitude = (Math.hypot(this.direction.x, this.direction.y))
    this.direction.x = this.direction.x / magnitude; 
    this.direction.y = this.direction.y / magnitude;
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

  destroy() {
    this.lifeTime++
    return (this.lifeTime >= 300) // 5s em gameticks
    console.log(this.lifeTime, this.destroy())

  }
}
