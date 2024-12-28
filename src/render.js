import sp2cords from "./sphere2/cordsParser";

import { eventData, currentCircle, tick, maxSumm, channelsSumm, channels } from "./main";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const scale = 1.5;

const x_circle = x => canvas.width / 2 + x * scale;
const y_circle = y => canvas.height / 2 + y * scale;

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    sp2cords.forEach((c, i) => {
        ctx.beginPath();
        ctx.arc(x_circle(c[0]), y_circle(c[1]), 30, 0, Math.PI * 2);
        if (eventData.length == 0) {
            ctx.fillStyle = "red";
        } else if (tick < 0) {
            ctx.fillStyle = `rgb(${255 / Math.log(maxSumm) * Math.log(channelsSumm[i] + 0.01)},0,0)`;
        } else if (tick >= 0) {
            ctx.fillStyle = `rgb(${255 / Math.max(...channels[i]) * channels[i][tick]},0,0)`;
        }
        ctx.fill();

        if (currentCircle === i) {
            ctx.fillStyle = "rgba(0,0,0,0.3)";
            ctx.beginPath();
            ctx.arc(x_circle(c[0]), y_circle(c[1]), 30, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(i + 1, canvas.width / 2 + c[0] * scale, canvas.height / 2 + c[1] * scale);
        // console.log(c[0], c[1]);
    });
    if (eventData.length == 0) {
        ctx.font = "80px Arial";
        ctx.fillStyle = "blue";
        ctx.fillText("Нет данных", canvas.width / 2, canvas.height / 2);
    }
}

export { scale, x_circle, y_circle, render, canvas, ctx };