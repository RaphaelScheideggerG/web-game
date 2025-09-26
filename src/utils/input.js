const Keys = {};
const JustPressed = {};

document.addEventListener("keydown", (e) => {
  if (!Keys[e.code]) {
    JustPressed[e.code] = true; // só dispara no frame em que a tecla foi pressionada
  }
  Keys[e.code] = true;
});

document.addEventListener("keyup", (e) => {
  Keys[e.code] = false;
  JustPressed[e.code] = false; // limpa quando a tecla é solta
});

// Função para limpar o JustPressed
function clearJustPressed() {
  for (let key in JustPressed) {
    JustPressed[key] = false;
  }
}

export { Keys, JustPressed, clearJustPressed };
