import { player } from "./player";

export class Bullet {
  constructor(power) {
    this.x = player.x + player.lastx * 10;
    this.y = player.y + player.lasty * 10;
    this.rad = 10;
    this.dirX = player.lastx;
    this.dirY = player.lasty;
    this.fired = false;
    this.power = power;
    coldown = 180;
  }

  updateBullet() {
    this.dirX = player.lastx;
    this.dirY = player.lasty;

    if (player.charging && !this.fired) {
      this.power += 0.1;
    }

    if (!player.charging && !this.fired) {
      this.rad = Math.min(this.power * 2.5, 25);
      this.vel = Math.min(this.power * 1.5, 10);
      this.fired = true;
    }

    if (this.fired) {
      this.x += Math.cos(this.vel);
      this.y += Math.sin(this.vel);
    }

    // Aqui vai a logica de desenho do projétil
  }
}
