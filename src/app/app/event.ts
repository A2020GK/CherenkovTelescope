import { uploadFile } from "@/utils";
import toast from "@brenoroosevelt/toast";

export interface Event {
    frames:number[][],
    running:boolean,
    name:string,
    framesSum:number[]
}
export interface EventAction {
    type:"change"|"run",
    frames?:number[][]
    name?:string
}
export const framesSum = (frames:number[][]) => {
    const chs = Array.from({length:frames[0].length}, ()=>0);
    frames.forEach(l=>l.forEach((d, i)=>chs[i]+=d));
    return chs as number[];
}

export const eventReducer = (event:Event|null, action:EventAction) => {
    switch(action.type) {
        case "change": {
            toast.success("✅ Загружено событие", {closeBtn:false, duration:1000})
            return {frames:action.frames, name:action.name, framesSum:framesSum(action.frames as number[][])} as Event;
        }
        case "run" :{
            return {...event, running:true} as Event;
        }
    }
    return event;
}

export const eventParse = (event:string) => event.split("\n").slice(1).map(a=>a.split(",").map(Number));
export const eventLoad = async (dispatcher:CallableFunction) => {
    let r = await uploadFile(".dat")
    let data = eventParse(r.data);
    dispatcher({
        type:"change",
        frames:data,
        name:r.filename,
        framesSum:framesSum(data)
    })
}