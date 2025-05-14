"use client";
import { useReducer } from "react";
import { Footer } from "@/app/app/components/Footer";
import { Header } from "@/app/app/components/Header";
import Mosaic from "@/app/app/components/Mosaic";
import { EventContext, EventDispatchContext, SettingsContext, SettingsDispatchContext } from "@/app/app/contexts";
import { Event, eventReducer } from "@/app/app/event";
import { settingsReducer } from "@/app/app/settings";
import "../style.css";


export const AppUi = ({eventd = null}:{eventd?:Event|null}) => {
    const [settings, dispatchSettings] = useReducer(settingsReducer, {
        displayMode: "modules"
    });
    const [event, dispatchEvent] = useReducer(eventReducer, eventd);

    return <div className="content">
        <SettingsContext.Provider value={settings}>
            <SettingsDispatchContext.Provider value={dispatchSettings}>
                <EventContext.Provider value={event}>
                    <EventDispatchContext.Provider value={dispatchEvent}>
                        <Header />
                        <main>
                            <Mosaic />
                        </main>
                        <Footer />
                    </EventDispatchContext.Provider>
                </EventContext.Provider>
            </SettingsDispatchContext.Provider>
        </SettingsContext.Provider>
    </div>
}