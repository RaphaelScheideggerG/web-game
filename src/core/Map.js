import { Canvas } from "./Canvas.js";

export const Map = {
  groundy: (window.innerHeight * 0.7),
  drawMap() {
    Canvas.ctx.clearRect(0, 0, Canvas.width, Canvas.height); // limpa a tela

    Canvas.ctx.fillStyle = "#223455ff"; // cor do céu
    Canvas.ctx.fillRect(0, 0, Canvas.width, Canvas.height); // fundo

    Canvas.ctx.fillStyle = "#293129ff"; // cor do chão
    Canvas.ctx.fillRect(0, this.groundy, Canvas.width, Canvas.height - this.groundy); // chão
  },
};
