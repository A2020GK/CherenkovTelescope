import { useContext } from "react"
import { EventContext } from "../contexts"
import { Event } from "../event";

export const Footer = () => {
    const event:Event = useContext(EventContext);
    return <footer>
        <span>&copy; Antony Karasev 2025</span>
        <span className="status">Ready, {event?`${event.name} 0/${event.frames.length}`:"<no event>"}</span>
    </footer>
}