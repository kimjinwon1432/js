const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;

// canvas.addEventListener("click", onClick);
canvas.addEventListener("mousemove", onMove);
