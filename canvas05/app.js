/* 
  html의 요소에 data-를 입력하면 -뒤에오는 변수로 js에서 사용할 수 있음   
  요소에 설정된 값을 확인하려면 해당요소의 dataset항목을 확인하면 됨

  colorOptions를 아래와같이 배열로 생성해준 이유는 
  js의 배열인 값을 받아와야하는데....
  htmlCollection으로 받아오기 때문임

  modeBtn을 만들어 fill일때 canvas전체에 색을 칠하고,
                draw일 때 선을 그릴 수 있도록 설정

  그림판의 내용 지우기 추가
*/
const eraserBtn = document.getElementById("eraser-btn");
const destroyBtn = document.getElementById("destroy-btn");
const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
let isPainting = false;
let isFilling = false;

lineWidth.style.accentColor = color.value;

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
function onChangeColor(e) {
  // color에 입력된 색의 값을 이용.
  lineWidth.style.accentColor = colorValue;
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
}
function onColorOptions(e) {
  // 나열된 색상들 중 하나가 클릭되었을 때
  // 선의 색상을 변경
  console.log(e.target.dataset.color);
  const colorValue = e.target.dataset.color;

  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;

  // input[type=color]의 값도 변경
  color.value = colorValue;
  lineWidth.style.accentColor = colorValue;
}
function onModeBtnClick(e) {
  //one is fill, one is stroke
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}
function onCanvasClick(e) {
  if (isFilling) {
    // fill 모드일때
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}
function onEraserClick(e) {
  ctx.strokeStyle = "white";
  lineWidth.style.accentColor = ctx.strokeStyle;
}

function onDestroyBtnClick(e) {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMousedown);
//마우스가 canvas를 떠났을 떄 선이 더이상 안그려지게 설정
canvas.addEventListener("mouseleave", onMouseLeave);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onChangeColor);
colorOptions.forEach((color) =>
  color.addEventListener("click", onColorOptions)
);

modeBtn.addEventListener("click", onModeBtnClick);
destroyBtn.addEventListener("click", onDestroyBtnClick);
eraserBtn.addEventListener("click", onEraserClick);
