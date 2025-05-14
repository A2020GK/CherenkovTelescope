"use client";
import { sp3cords } from "@/sp3cords";
import { Pixel } from "./Pixel";
import { CSSProperties, MouseEventHandler, useContext, useState, WheelEventHandler } from "react";
import { EventContext, SettingsContext } from "../contexts";
import { Settings } from "../settings";
import { Event } from "../event";

const Mosaic = () => {
    const settings: Settings = useContext(SettingsContext);
    const event:Event = useContext(EventContext);

    const [scale, setScale] = useState(0.5);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [drag, setDrag] = useState(false);

    let mosaic;
    let colorFromVal:any = ()=>0;
        if(event) {
            const max = Math.max(...event.framesSum);
            colorFromVal = (i:number) => 255 / Math.log(max) * Math.log(event.framesSum[i] + 0.01);
        }

    if (settings.displayMode == "pixels") {
        mosaic = sp3cords.map((dt, index) => (
            <Pixel key={index} x={dt[0]} y={dt[1]} index={index + 1} color={{r:colorFromVal(Math.floor(index/7)),g:0,b:0}} />
        ))
    } else if (settings.displayMode == "modules") {
        mosaic = [];
        for(let i=0;i<sp3cords.length;i+=7) {
            const cords = sp3cords[i];
            const cof = 1150;
            mosaic.push(<Pixel key={i/7} x={cords[3] * cof} y={cords[4] * cof} index={i /7 + 1} color={{r:colorFromVal(i / 7), g:0, b:0}}/>);
        }
    }


    const handleScroll: WheelEventHandler<HTMLDivElement> = (e) => {
        if (scale - e.deltaY * 0.001 > 0) setScale(scale - e.deltaY * 0.001);
    }
    const mouseDown: MouseEventHandler<HTMLDivElement> = (e) => setDrag(true);
    const mouseUp: MouseEventHandler<HTMLDivElement> = (e) => setDrag(false);
    const mouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
        if (drag) setTranslate({
            x: translate.x + e.movementX * 1/scale,
            y: translate.y + e.movementY * 1/scale
        });
    }


    const styles: CSSProperties = {
        scale: scale,
        transform: `translate(${translate.x}px, ${translate.y}px)`
    }

    return <div className="mosaic-base" onWheel={handleScroll} onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove} onMouseLeave={mouseUp}><div className="mosaic-container" style={styles}><div className="mosaic">
        {mosaic}
    </div></div></div>
}
export default Mosaic;