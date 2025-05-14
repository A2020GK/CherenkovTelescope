import toast from "@brenoroosevelt/toast"
type DisplayMode = "modules"|"pixels";
export interface Settings {
    displayMode:DisplayMode
}
export interface SettingsAction {
    type:"displayMode",
    displayMode?:DisplayMode
}
export const settingsReducer = (settings:Settings, action:SettingsAction) => {
    switch(action.type) {
        case "displayMode": {
            toast.info(`ℹ️ Режим отображения изменён на "${{modules:"Модули", pixels:"Пиксели"}[action.displayMode as string]}"`, {duration:500, closeBtn:false})
            return {...settings, displayMode:action.displayMode} as Settings;
        }
    }
}