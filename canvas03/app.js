const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = 2;
let toggle = false;
function onMove(mouse) {
  if (toggle) {
    ctx.lineTo(mouse.offsetX, mouse.offsetY);
    ctx.stroke();
    // ctx.fill();
    return;
  }
}
function onMousedown(mouse) {
  toggle = true;
  ctx.beginPath();
  ctx.moveTo(mouse.offsetX, mouse.offsetY);
}
function onMouseLeave(mouse) {
  toggle = false;
}

canvas.addEventListener("mouseup", function () {
  toggle = false;
});

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMousedown);
//마우스가 canvas를 떠났을 떄 선이 더이상 안그려지게 설정
canvas.addEventListener("mouseleave", onMouseLeave);
