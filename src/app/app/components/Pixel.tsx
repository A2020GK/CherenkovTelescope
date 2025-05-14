import { CSSProperties, useContext } from "react"
import { Settings } from "../settings"
import { SettingsContext } from "../contexts"

export const Pixel = ({index, x, y, color = {r:0, g:0, b:0}}:{index:number, x:number, y:number, color?:{r:number, g:number, b:number}}) => {
    const settings:Settings = useContext(SettingsContext);

    const cof = settings.displayMode == "pixels" ? 5 : 1.5
    const width = 60;

    const styles:CSSProperties = {
        left: `${x * cof}px`,
        top: `${y * cof}px`,
        backgroundColor:`rgb(${color.r}, ${color.g}, ${color.b})`,
        width:`${width}px`,
        height:`${width}px`,
    }
    return <div className="pixel" style={styles}>{index}</div>
}