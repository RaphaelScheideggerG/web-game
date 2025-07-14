// main.js
// Loop 60 fps
function loop() {
  update_player();
  draw();
  update_physics();
  requestAnimationFrame(loop);
}

loop();
