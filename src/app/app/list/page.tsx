import { EventList } from "./EventList";

import "./style.css";
import { readdirSync } from "fs";

const List = () => {
    const list = readdirSync("events");
    return  <EventList events={list}/>
}
export default List