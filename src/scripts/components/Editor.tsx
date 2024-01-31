import React from "react";

export default function Editor() {
    return (
        <div className="container">
            <div className="height-editor">
                <p>Height:</p>
                <input id="height-input" min="1" max="6" type="number"></input>
            </div>
            <div className="delay-editor">
                <p>Delay (ms):</p>
                <input id="delay-input" min="0" max="500" type="number"></input>
            </div>
            <p>Press <b>R</b> to start a sort.</p>
            <p>Built by <a rel="noreferrer" target="_blank"  href="https://github.com/iangaunt">@iangaunt</a>.</p>
        </div>
    )
}