const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Define a resolução do canvas
canvas.width = 800;
canvas.height = 600;

// Define e captura as teclas apertadas e armazena no objeto keys
const keys = {};
document.addEventListener("keydown", (e) => (keys[e.code] = true));
document.addEventListener("keyup", (e) => (keys[e.code] = false));

const groundy = 350;

// Define objeto player
const player = {
  x: 50,
  y: 300,
  width: 50,
  height: 50,
  velx: 0,
  vely: 0,
  speed: 5,
  jumpforce: -12,
  grounded: false,
  gravity: 0.6,
  friction: 0.8,
  jumpcount: 2,
};

function update() {
  // Verifica as teclas pressinadas
  if (keys["KeyD"]) player.velx = player.speed;
  if (keys["KeyA"]) player.velx = -player.speed;
  player.velx *= player.friction;

  // Parada brusca
  if (keys["KeyD"] && keys["KeyA"]) {
    player.velx = 0;
  }

  // Instruções no pulo
  if (keys["Space"] && player.jumpcount > 0) {
    player.vely = player.jumpforce;
    player.grounded = false;
    keys["Space"] = false;
    player.jumpcount -= 1;
  }

  // Gravidade
  player.vely += player.gravity;

  // Atualiza a posição
  player.x += player.velx;
  player.y += player.vely;
  player.grounded = false;

  // Colisão com o chão
  if (player.y + player.height >= groundy) {
    player.y = groundy - player.height;
    player.vely = 0;
    player.grounded = true;
    player.jumpcount = 2;
  }

  // Debug
  console.log(
    /*"ArrowLeft:",
    keys["ArrowLeft"],
    "ArrowRight:",
    keys["ArrowRight"]*/
    "jumpcount:",
    player.jumpcount
  );
}

function draw() {
  // Limpa a teclas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // chão
  ctx.fillStyle = "#444";
  ctx.fillRect(0, groundy, canvas.width, canvas.height - groundy);

  // Desenha o player
  ctx.fillStyle = "#0f0";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Desenha o projetil
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
