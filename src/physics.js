// physics.js
function update_physics() {
  // Atrito
  player.velx *= player.friction;

  // Gravidade
  player.vely += player.gravity;

  // Colisão com o chão
  if (player.y + player.height >= groundy) {
    player.y = groundy - player.height;
    player.vely = 0;
    player.grounded = true;
    player.jumpcount = 2;
  }
}
