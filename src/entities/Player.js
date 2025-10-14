import { Keys, JustPressed } from "../utils/input.js";
import { Bullet } from "./Bullet.js";
import { Canvas } from "../core/Canvas.js";

export class Player {
  constructor(x, y) {
    this.position = { x, y };
    this.width = 50;
    this.height = 75;
    this.speed = { x: 0, y: 0 };
    this.vel = 5;
    this.jumpforce = -12;
    this.grounded = false;
    this.gravity = 0.6;
    this.friction = 0.7;
    this.jumpcount = 2;
    this.vterminal = 20;
    this.jumpCooldown = 15;
    this.shotCooldown = 60;
    this.cooldown = 0;
    this.charging = false;
    this.aim = { x: 0, y: 0 };
    this.lastAim = { x: 1, y: 0 };
    this.bullets = [];
  }

  draw() {
    Canvas.ctx.fillStyle = "#0f0";
    Canvas.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    // Barrinha de cooldown
    const barWidth = (this.cooldown / this.shotCooldown) * this.width;
    Canvas.ctx.fillStyle = "#ff0";
    Canvas.ctx.fillRect(this.position.x, this.position.y - 10, barWidth, 5);
  }

  move() {
    if (Keys["KeyD"]) this.speed.x = this.vel;
    if (Keys["KeyA"]) this.speed.x = -this.vel;
    if (Keys["KeyD"] && Keys["KeyA"]) this.speed.x = 0;
    if (!Keys["KeyD"] && !Keys["KeyA"]) this.speed.x *= this.friction;
    this.position.x += this.speed.x;
  }

  jump() {
    if (JustPressed["Space"] && this.jumpcount > 0) {
      this.speed.y = this.jumpforce;
      this.jumpcount--;
      this.grounded = false;
    }
    if (!Keys["Space"] && !this.grounded && this.speed.y < 0) {
      this.speed.y *= 0.5;
    }
    this.position.y += this.speed.y;
  }

  aimControl() {
    this.aim.x = Keys["KeyD"] ? 1 : Keys["KeyA"] ? -1 : 0;
    this.lastAim.x = this.aim.x || this.lastAim.x;
    this.aim.y = Keys["KeyW"] ? -1 : Keys["KeyS"] ? 1 : 0;
    this.lastAim.y = this.aim.y || this.lastAim.y;
  }

  shoot() {
    if (this.cooldown > 0) this.cooldown--;

    if (JustPressed["KeyK"] && !this.charging && this.cooldown === 0) {
      this.bullets.push(new Bullet(this));
      this.charging = true;
      this.cooldown = this.shotCooldown;
    }

    if (!Keys["KeyK"]) {
      this.charging = false;
      for (let bullet of this.bullets) {
        if (!bullet.fired) bullet.fired = true;
      }
    }

    for (let bullet of this.bullets) {
      if (!bullet.fired && this.charging) {
        bullet.charge()
      };
      if (bullet.fired) {
        bullet.shoot(); 
        bullet.destroy();
        if (bullet.destroy()) {
          this.bullets.shift()
        };
      };
    }
  }

  updatePlayer() {
    this.draw();
    this.move();
    this.jump();
    this.aimControl();
    this.shoot();
    console.log(this.bullets);
  }
}