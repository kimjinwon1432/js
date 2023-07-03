/* 
file 첨부
브라우저의 메모리를 url로 접근!

text추가(더블클릭 시)
*/
const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
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

//canvas initialize
canvas.width = 800;
canvas.height = 800;

//ctx initialize
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;

// rangd의 색상 변경
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
//파일 선택 시
function onFileChange(e){
  const file=e.target.files[0];
  const url = URL.createObjectURL(file);
  // console.log(url); //blob:http://127.0.0.1:5500/07ee8a3e-55b3-48ab-a607-0f049a9591a0
  
  //img태그 생성 //docume nt.createElement("img")
  const img = new Image(); // <img src=""/> 와 동일
  img.src = url;
  //img가 로드됬을 때 실행됨
  img.onload= function(){
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    //다른파일올릴수 있게 파일 초기화
    fileInput.value=null;
  };
}
function onDoubleclick(e) {
  //text의 값에 접근
  const text = textInput.value;
  if(text!==""){ 
    ctx.save(); // ctx의 현재 상태, 색상, 스타일 등 모든것을 저장.
    console.log(e.offsetX, e.offsetY)
    //text 쓰기 전에 선 굵기 조절
    ctx.lineWidth=1;  
    ctx.font="48px serif"
    //text쓰기
    // ctx.strokeText(text, e.offsetX, e.offsetY); //글자의 테두리만 생성
    ctx.fillText(text, e.offsetX, e.offsetY)
  
    
    // ctx.lineWidth=lineWidth.value; // 걍 이거 써도 되는데,,, 저런 방법도 있어!
    // 저장한 ctx의 상태로 복구
    ctx.restore();
  }
}
function onSaveClick(e){
  const url = canvas.toDataURL(); //canvas에 그린 그림을 url로 인코딩
  //<a href="" download > a태그의 download 옵션 사용
  const a= document.createElement("a"); 
  a.href=url;
  a.download = "myDrawing.png";
  a.click();
}
// 이벤트 추가하는 다른 방법
// canvas.onmousemove = function(){}
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMousedown);
//마우스가 canvas를 떠났을 떄 선이 더이상 안그려지게 설정
canvas.addEventListener("mouseleave", onMouseLeave);
canvas.addEventListener("click", onCanvasClick);
//더블클릭
canvas.addEventListener("dblclick", onDoubleclick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onChangeColor);
colorOptions.forEach((color) =>
  color.addEventListener("click", onColorOptions)
);

modeBtn.addEventListener("click", onModeBtnClick);
destroyBtn.addEventListener("click", onDestroyBtnClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick)
