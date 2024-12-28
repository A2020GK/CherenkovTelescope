import "./style.css"
import "./fontawesome/css/fontawesome.css";
import "./fontawesome/css/solid.min.css";

import sp2cords from "./sphere2/cordsParser";
import parseEvent from "./sphere2/eventParser.js";

import "./eventLoader.js";

import Plotly from "plotly.js-dist"
import plotlyLocaleRu from "plotly.js-locales/ru.js";

import { pointInCircle, relativeCords } from "./utils.js";

import { x_circle, y_circle, render,canvas } from "./render.js";

const plot = document.querySelector(".plot");
const overlay = document.querySelector(".overlay");

let eventData = [];
let channels = [];
let channelsSumm = [];
let maxSumm = 0;
let tick = -1
let currentCircle = false;
export {eventData, channels, channelsSumm, maxSumm, tick, currentCircle};

function updateSize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    render();
}
addEventListener("resize", updateSize)
updateSize();


function detectCircle(point) {
    let did = false;
    for (let i = 0; i < sp2cords.length; i++) {
        const c = sp2cords[i];
        if (pointInCircle(point, { x: x_circle(c[0]), y: y_circle(c[1]) }, 30)) {
            // console.log(i+1);
            return i;
        }
    }
    return false;
}

canvas.addEventListener("mousemove", event => {
    let point = relativeCords(event);
    currentCircle = detectCircle(point);
    render();
})
canvas.addEventListener("click", event => {
    let point = relativeCords(event);
    if ((currentCircle = detectCircle(point)) !== false) {
        console.log(`Click on circle ${currentCircle + 1}`);

        const plotCloseIcon = {
            width: 384,
            height: 512,
            path: `M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z`
        }
        const data = {
            x: Array(channels[currentCircle].length).keys(),
            y: channels[currentCircle],
            type: "scatter",
            mode: "lines",
            hovertemplate: 'X: %{x}<br>Y: %{y}<extra></extra>', // Customize hover info
        };
        const layout = {
            title: `Канал ${currentCircle + 1}`,
            hovermode: "y"
        }
        Plotly.register(plotlyLocaleRu);
        const config = {
            scrollZoom: true,
            locale: "ru",
            modeBarButtonsToAdd: [
                {
                    name: "Закрыть",
                    icon: plotCloseIcon,
                    click: gd => {
                        overlay.classList.add("hidden");
                    }
                }
            ],
            // xAxis:{range:[0, channels[currentCircle].length]}
        }
        Plotly.newPlot(plot, [data], layout, config);
        overlay.classList.remove("hidden");
    }
    render();
})

function setEvent(data) {
    data = parseEvent(data);
    console.log(`Parsing ${data.length} cutted lines of event data`);
    let start = performance.now();
    eventData = data;
    channels = Array.from({ length: eventData[0].length + 1 }, () => []);
    channelsSumm = Array.from({ length: eventData[0].length + 1 }, () => 0);

    eventData.forEach((line, index) => {
        line.forEach((value, channel) => {
            channels[channel].push(value);
            channelsSumm[channel] += value;
        });
    });
    maxSumm = Math.max(...channelsSumm);
    console.log(`Parsing took ${performance.now() - start}ms`);
    render();
}

render();
export { setEvent };