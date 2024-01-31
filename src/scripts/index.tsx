import "../css/style.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { Icon } from '@iconify/react';

import Heap from "./Heap"
import Tree from "./components/Tree";

const HEIGHT = 6;

const root = createRoot(document.getElementById("main"));
root.render(<Tree height={HEIGHT}/>);

let delay = 10;
let heap: Heap = new Heap(HEIGHT);

function buildHeap() {
    let startingHeight = HEIGHT - 1;

    for (let i = startingHeight; i > 0; i--) {
        for (let j = Math.pow(2, i - 1); j > 0; j--) {
            setTimeout(() => {
                heap.heapify(i, j);
            }, delay * 150)
            delay++;
        }i
    }
}

buildHeap();