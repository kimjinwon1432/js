const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;
ctx.beginPath();
ctx.lineWidth = 2;
ctx.moveTo(0, 0);

const colors = ["#34495e", "#27ae60", "#e74c3c", "#c0392b", "#95a5a6"];

function onClick(event) {
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
}
function onMove(event) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  const color = colors[Math.floor(Math.random() * colors.length)];
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.strokeStyle = color;
  ctx.stroke();
}

// canvas.addEventListener("click", onClick);
canvas.addEventListener("mousemove", onMove);
