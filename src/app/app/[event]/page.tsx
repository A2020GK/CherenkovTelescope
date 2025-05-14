import { readFileSync } from "fs";
import { Event, eventParse, framesSum } from "../event";
import { AppUi } from "../components/App";

const FileEvent = async ({params}:{params:Promise<{event:string}>}) => {
    const {event} = await params;
    const data = eventParse(readFileSync(`events/${event}`).toString());
    const eventd:Event = {
        name:event,
        frames:data,
        running:false,
        framesSum:framesSum(data)
    }

    return <AppUi eventd={eventd}/>
}
export default FileEvent;