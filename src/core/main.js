// main.js
// Loop 60 fps

import { update_physics } from "../utils/physics.js";
import { update_player } from "../entities/Player.js";
import { Map } from "./Map.js";
import { clearJustPressed } from "../utils/input.js";

function gameLoop() {
  Map.drawMap();
  update_player();
  update_physics();
  requestAnimationFrame(gameLoop);
  clearJustPressed();
}

gameLoop();
