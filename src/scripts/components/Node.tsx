import React from "react";

function getParent(height: number, pos: number) {
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

function highlightFamily(height: number, pos: number, maxHeight: number, pCol: string, cCol: string) {
    if (height != 1) {
        const parent = getParent(height, pos)
        parent.style.backgroundColor = pCol;
    }

    if (height != maxHeight) {
        const leftChild = getLeftChild(height, pos);
        const rightChild = getRightChild(height, pos);
        leftChild.style.backgroundColor = cCol;
        rightChild.style.backgroundColor = cCol;
    }
}

export default function Node(props: {
    data: number,
    height: number,
    pos: number,
    id: string,
    maxHeight: number
}) {
    const nodeHeight = 100 - props.height * 10 - 10;
    const nodeColor = 150 + props.height * 20;
    
    const nodeStyle = {
        backgroundColor: "rgb(" + nodeColor + ", " + nodeColor + ", " + nodeColor +")",
        fontSize: nodeHeight / 6,
        top: props.height * 110 - 25 * props.height,
        left: 250 + (1000 / Math.pow(2, props.height)) * (2 * props.pos - 1) - nodeHeight / 2,
        height: nodeHeight
    }

    const parentBackgroundColor = "rgb(" + (nodeColor - 20) + ", " + (nodeColor - 20) + ", " + (nodeColor - 20) + ")";
    const childBackgroundColor = "rgb(" + (nodeColor + 20) + ", " + (nodeColor + 20) + ", " + (nodeColor + 20) + ")";

    return (
        <div className="node" style={nodeStyle} id={props.id} onMouseEnter={() => {
            highlightFamily(props.height, props.pos, props.maxHeight, "red", "rgb(0, 255, 0)");
        }} onMouseLeave={() => {
            highlightFamily(props.height, props.pos, props.maxHeight, parentBackgroundColor, childBackgroundColor);
        }}>
            <h1>{props.data}</h1>
        </div>
    )
}