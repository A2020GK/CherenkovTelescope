"use client";
import Dropdown from "@/app/app/components/Dropdown"
import Link from "next/link";
import { ActionDispatch, useContext } from "react";
import { EventDispatchContext, SettingsContext, SettingsDispatchContext } from "../contexts";
import { Settings, SettingsAction } from "../settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { eventLoad } from "../event";

export const Header = () => {
    const settings:Settings = useContext(SettingsContext);
    const dispatchSettings:ActionDispatch<[action:SettingsAction]> = useContext(SettingsDispatchContext);
    const eventDispatch = useContext(EventDispatchContext);
    return <header>
        <Dropdown title="Файл">
            <Link href="/app/list">Список событий</Link>
            <a onClick={()=>eventLoad(eventDispatch)}>Открыть</a>
        </Dropdown>
        <Dropdown title="Способ отображения">
            <a onClick={()=>
                dispatchSettings({type:"displayMode", displayMode:"modules"})
            }>{settings.displayMode == "modules" && <FontAwesomeIcon icon={faCheck}/>} Модули</a>
            <a onClick={()=>
                dispatchSettings({type:"displayMode", displayMode:"pixels"})
            }>{settings.displayMode == "pixels" && <FontAwesomeIcon icon={faCheck}/>} Пиксели</a>
        </Dropdown>
    </header>
}
