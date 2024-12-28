import { uploadFile } from "./fileUtils";
import { setEvent } from "./main";
import parseEvent from "./sphere2/eventParser";

document.getElementById("event-open").addEventListener("click",event=>{
    uploadFile(file=>{
        setEvent(file);
    });
});