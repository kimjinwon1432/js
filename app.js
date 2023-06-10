const canvas = document.querySelector("canvas");

//context 캔버스에 그림을 그릴 때 사용하는 것
const ctx = canvas.getContext("2d");

// js와 css에게 canvas의 사이즈를 알려줘야해
// 추후 선을 그리면 JS에서만 WIDTH, HEIGHT를 수정할 것임
canvas.width = 800;
canvas.height = 800;

//좌표 시스템 이해 canvas의 좌측 상단꼭지점에서부터 시작함
ctx.fillRect(100, -100, 300, 400);

ctx.strokeRect(75, 150, 150, 110);
