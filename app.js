const canvas = document.querySelector("canvas");

//context 캔버스에 그림을 그릴 때 사용하는 것
const ctx = canvas.getContext("2d");

// js와 css에게 canvas의 사이즈를 알려줘야해
// 추후 선을 그리면 JS에서만 WIDTH, HEIGHT를 수정할 것임
canvas.width = 800;
canvas.height = 800;

//좌표 시스템 이해 canvas의 좌측 상단꼭지점에서부터 시작함
//검은색으로 채워진 사각형을 볼 수 있음
// ctx.fillRect(100, 100, 300, 400);

// #part 1
//선으로만 이루어진 사각형을 볼 수 있음.
ctx.rect(10, 10, 20, 20);
ctx.rect(30, 30, 20, 20);
// ctx.fill();

// fill이후에 그려진 사각형은 화면에 표시되지 않아..
ctx.rect(50, 50, 20, 20);
//따라서 다시 fill을 사용하여 사각형을 출력할 수 있음
ctx.fill();

// 이전의 경로와 단절시켜 새로운 경로를 만듬
ctx.beginPath();

//색상 변경
ctx.fillStyle = "red";
ctx.rect(80, 30, 20, 20);
ctx.fill();
// setTimeout(() => {
//   ctx.fill();
// }, 5000);
//arc

//브러쉬 움직이기
ctx.beginPath();
ctx.moveTo(200, 50);
ctx.lineTo(300, 50);
ctx.lineTo(300, 150);
ctx.lineTo(200, 150);
ctx.lineTo(200, 50);
ctx.stroke();

// draw house
//fillRect : moveTo + lineTo
ctx.beginPath();
ctx.fillStyle = "red";
ctx.fillRect(300, 300, 50, 200);
ctx.fillRect(100, 300, 50, 200);
ctx.lineWidth = 10;
ctx.strokeRect(200, 400, 50, 100); //door

//ceiling
ctx.fillStyle = "blue";
ctx.fillRect(100, 300, 250, 20);
ctx.moveTo(100, 300);
ctx.lineTo(225, 200);
ctx.lineTo(350, 300);
ctx.lineTo(100, 300);
ctx.fill();

// #rect, arc
// building body of person
// start x:500
ctx.beginPath();
ctx.fillRect(500, 200, 15, 100); // left arm
ctx.fillRect(660, 200, 15, 100); // right arm
ctx.fillRect(540, 200, 30, 200); //left leg
ctx.fillRect(605, 200, 30, 200); // right leg  (620) =x

//body
ctx.beginPath();
ctx.fillStyle = "blue";
ctx.fillRect(500, 200, 175, 40);
/// head
ctx.arc(500, 200, 20, 0, 2 * Math.PI);
ctx.arc((675 + 500) / 2, 200, 50, 0, 2 * Math.PI);
ctx.fill();

//eyes
ctx.beginPath();
ctx.fillStyle = "white";
ctx.arc(567, 200, 15, 1 * Math.PI, 2 * Math.PI);
ctx.arc(607, 200, 15, 1 * Math.PI, 2 * Math.PI);
ctx.fill();
