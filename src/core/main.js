// main.js
// Loop 60 fps

import { update_physics } from "../utils/physics";
import { update_player } from "./player";
import { drawMap } from "./Map";

function loop() {
  drawMap();
  update_player();
  update_physics();
  requestAnimationFrame(loop);
}

loop();
