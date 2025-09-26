export const Map = {
  groundy: 350,
  drawMap() {
    // Limpa a tela
    Canvas.ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    // chão
    Canvas.ctx.fillStyle = "#444";
    Canvas.ctx.fillRect(0, groundy, Canvas.width, Canvas.height - groundy);
  },
};
