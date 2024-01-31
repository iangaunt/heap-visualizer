import "../css/style.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { Icon } from '@iconify/react';

import Tree from "./Tree";

const main = document.getElementById("main");

const HEIGHT = 6;

const root = createRoot(main);
root.render(<Tree height={HEIGHT}/>);

function getParent(height: number, pos: number): HTMLElement {
    let parentHeight = height - 1;
    let parentPos = Math.ceil((pos / Math.pow(2, height)) * Math.pow(2, height - 1))
    return document.getElementById(parentHeight + "-" + parentPos);
} 

function getLeftChild(height: number, pos: number): HTMLElement {
    return document.getElementById(height + 1 + "-" + (2 * pos - 1));
}

function getRightChild(height: number, pos: number): HTMLElement {
    return document.getElementById(height + 1 + "-" + (2 * pos));
}

function getValue(height: number, pos: number): number {
    return parseInt(
        document.getElementById(height + "-" + pos).getElementsByTagName("h1")[0].innerHTML
    );
}

function getElemValue(element: HTMLElement): number {
    return parseInt(element.getElementsByTagName("h1")[0].innerHTML);
}

function swapElementValues(one: HTMLElement, two: HTMLElement): void {
    let temp = getElemValue(one);
    one.getElementsByTagName("h1")[0].innerHTML = two.getElementsByTagName("h1")[0].innerHTML;
    two.getElementsByTagName("h1")[0].innerHTML = temp.toString();
}

function swapColors(one: HTMLElement, two: HTMLElement): void {
    let temp = one.style.backgroundColor;
    one.style.backgroundColor = two.style.backgroundColor;
    two.style.backgroundColor = temp;
}

function heapify(height: number, pos: number) {
    if (height == HEIGHT) return;
    console.log(height + "-" + pos);
    console.log(document.getElementById(height + "-" + pos));

    let elem = document.getElementById(height + "-" + pos);
    let value = getElemValue(elem);
    
    let left = getLeftChild(height, pos);
    let leftValue = getElemValue(left);

    let right = getRightChild(height, pos);
    let rightValue = getElemValue(right);
    
    let largest = value;

    if (leftValue > largest) largest = leftValue;
    if (rightValue > largest) largest = rightValue

    if (largest != value) {
        if (largest == leftValue) {
            swapElementValues(left, elem);
            swapColors(left, elem);
            heapify(
                parseInt(left.id.substring(0, left.id.indexOf("-"))),
                parseInt(left.id.substring(left.id.indexOf("-") + 1))
            )
        } else if (largest == rightValue) {
            swapElementValues(right, elem);
            swapColors(left, elem);
            heapify(
                parseInt(right.id.substring(0, left.id.indexOf("-"))),
                parseInt(right.id.substring(left.id.indexOf("-") + 1))
            )
        }
    }
}

let delay = 10;

function buildHeap() {
    let startingHeight = HEIGHT - 1;

    for (let i = startingHeight; i > 0; i--) {
        for (let j = Math.pow(2, i - 1); j > 0; j--) {
            setTimeout(() => {
                heapify(i, j);
            }, delay * 150)
            delay++;
        }
    }
}

buildHeap();