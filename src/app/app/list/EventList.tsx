"use client";

import { animatedRedirect } from "@/utils";
import { use, useState } from "react";

export const EventList = ({ events }: { events: string[] }) => {
    const [back, setBack] = useState(false);

    return <div className={`content-text${back ? " disappear" : ""}`}>
        <h1>Список событий</h1>
        <div className="event-list">
            <table border={1}>
                <thead>
                    <tr><th>Название файла</th><th>Действия</th></tr>
                </thead>
                <tbody>
                    {events.map((file: any, i: number) => (<tr key={i}><td>{file}</td><td><a href={`/app/${file}`}>Открыть</a></td></tr>))}
                </tbody>
            </table>
        </div>
        <p><a className="link" href="/app" onClick={(e) => animatedRedirect(e, "/app", setBack, 100)}>Назад</a></p>
    </div>
}