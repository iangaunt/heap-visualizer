import "../css/style.css";

import React from "react";
import { createRoot } from "react-dom/client";

import Editor from "./components/Editor"
import Heap from "./Heap"
import Tree from "./components/Tree";

const treeRoot = createRoot(document.getElementById("main"));
const editorRoot = createRoot(document.getElementById("editor"));
editorRoot.render(<Editor />);

document.body.addEventListener("keydown", (e: KeyboardEvent) => {
    const heightInput: HTMLInputElement = document.getElementById("height-input") as HTMLInputElement;
    const delayInput: HTMLInputElement = document.getElementById("delay-input") as HTMLInputElement;

    const HEIGHT = parseInt(heightInput.value);
    const DELAY = parseInt(delayInput.value);

    if (e.key == "r") {
        treeRoot.render(<Tree height={HEIGHT} />);
        Heap.buildHeap(HEIGHT, DELAY);
    }
});