"use client";
import { animatedRedirect } from "@/utils";
import { useState } from "react";

const Home = () => {
    const [start, setStart] = useState(false);
    return <div className={`content-text${start ? " disappear" : ""}`}>
        <h1>Визуализация данных атмосферного черенковского телескопа СФЕРА-3</h1>
        <div className="text">
            <p>Приложение позволяет просматривать и анализировать события прилёта черенковского света</p>
            <p>Разработчик: Antony</p>
            <p><a onClick={e=>animatedRedirect(e,"/app", setStart)} href="/app" className="link">Запуск</a></p>
        </div>
    </div>
}
export default Home;