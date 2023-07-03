const modeBtn= document.getElementById("mode")
const destroyBtn = document.getElementById("destory");
const eraserBtn = document.getElementById("eraser");
const colorOptions= Array.from(document.getElementsByClassName("color-option"));
const fileInput = document.getElementById("file")
const saveBtn = document.getElementById("save")
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth=document.getElementById("line-width");
const color= document.getElementById("color");

canvas.width=800;
canvas.height=800;

ctx.lineWidth   = lineWidth.value;
ctx.lineCap     = "round";
let isPainting  = false;
let isFilling   = false;

lineWidth.style.accentColor = color.value;

function onMouseMove(m){
    if(isPainting) {
        ctx.lineTo(m.offsetX, m.offsetY);
        ctx.stroke();
        return;
    }
}

function onMouseDown(m){
    isPainting=true;
    ctx.beginPath();
    ctx.moveTo(m.offsetX, m.offsetY)
}

function onMouseLeave(){
    isPainting=false;
}
function onMouseUp(){
    isPainting= false;
}

function onCanvasClick(e){
    if(isFilling){
         ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

}

function onChangeColor(e){

}
function onColorOptions(e){
    const colorValue=e.target.dataset.color; // data-[변수명] 사용시 e.target.dataset.[변수명]으로 끌고올 수 있음
    ctx.strokeStyle=colorValue;
    ctx.fillStyle=colorValue;

    color.value=colorValue
    lineWidth.style.accentColor=colorValue
}

function onModeBtnClick(e){
    if(isFilling=== false){
        isFilling=true;
        modeBtn.innerText="Draw"
    } else{
        isFilling=false;
        modeBtn.innerText="Fill"
    }
}
function onDestroyBtnClick(){
    ctx.beginPath();
    ctx.fillStyle='white'
    ctx.fillRect(0,0, canvas.width, canvas.height)
}
function onEraseBtnrClick(e){
    ctx.strokeStyle='white';
    lineWidth.style.accentColor = ctx.strokeStyle;
}

function onLineWidthChange(e){
    ctx.lineWidth= lineWidth.value
}

function onFileInputClick(e){
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);

    const img = new Image();
    img.src=url;

    img.onload= function(){
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        fileInput.value=null;
    }
}


function onSaveClick(e){
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href=url;
    a.download = "myDrawing.png";
    a.click();
}
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener("mouseleave", onMouseLeave);
canvas.addEventListener("click", onCanvasClick);

color.addEventListener("change", onChangeColor);
colorOptions.forEach((color) => 
    color.addEventListener("click", onColorOptions)
)

modeBtn.addEventListener('click', onModeBtnClick)
destroyBtn.addEventListener('click', onDestroyBtnClick)
eraserBtn.addEventListener('click', onEraseBtnrClick)

lineWidth.addEventListener('change', onLineWidthChange)
fileInput.addEventListener('change', onFileInputClick)
saveBtn.addEventListener('click', onSaveClick)