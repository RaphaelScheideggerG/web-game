// main.js
// Loop 60 fps

import { update_physics } from "./physics";
import { update_player } from "./player";
import { draw } from "./game";

function loop() {
  update_player();
  update_physics();
  draw();
  requestAnimationFrame(loop);
}

loop();
