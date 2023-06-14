/* 
  linewidth를 적용하기 위해 input 태그의 range를 사용
    step 옵션 사용방법, min/max적용, value로 기본 값을 설정
  이전에 그린 선의 굵기에 새로운 굵기가 적용되지 않게하기위해 선을 그릴 때 beginPath()룰 츄가
  js에서 input태그에 eventListener를 추가하여 값이 변할 때 마다 함수를 실행할 수 있도록 하는 change 학습
*/
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.getElementById("line-width");
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
let isPainting = false;
function onMove(mouse) {
  if (isPainting) {
    ctx.lineTo(mouse.offsetX, mouse.offsetY);
    ctx.stroke();
    // ctx.fill();
    return;
  }
}
function onMousedown(mouse) {
  isPainting = true;
  ctx.beginPath(); // 선 굵기 조정시 이전에 그린 선에 영향을 미치지 않게 하기 위해 필요
  ctx.moveTo(mouse.offsetX, mouse.offsetY);
}
function onMouseLeave(mouse) {
  isPainting = false;
}
function onMouseUp() {
  isPainting = false;
}
function onLineWidthChange(e) {
  // console.log(e.target.value); // 요소의 값에 접근하는 방법
  ctx.lineWidth = e.target.value;
}
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMousedown);
//마우스가 canvas를 떠났을 떄 선이 더이상 안그려지게 설정
canvas.addEventListener("mouseleave", onMouseLeave);

lineWidth.addEventListener("change", onLineWidthChange);
