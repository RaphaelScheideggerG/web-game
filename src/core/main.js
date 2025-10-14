// main.js
// Loop 60 fps

import { update_physics } from "../utils/physics.js";
import { Player } from "../entities/Player.js";
import { Map } from "./Map.js";
import { clearJustPressed } from "../utils/input.js";


const p1 = new Player(50, 300)

function gameLoop() {
  Map.drawMap();
  update_physics(p1);
  p1.updatePlayer();
  clearJustPressed();
  requestAnimationFrame(gameLoop);
}

gameLoop();
