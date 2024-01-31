import React from "react";

import Heap from "../Heap"

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
        top: ((screen.height - 95 * props.maxHeight - 10) / 2 - nodeHeight) + props.height * 85 - (100 - nodeHeight),
        left: ((screen.width - 1000) / 2) + (1000 / Math.pow(2, props.height)) * (2 * props.pos - 1) - nodeHeight / 2,
        height: nodeHeight
    }

    const parentBackgroundColor = "rgb(" + (nodeColor - 20) + ", " + (nodeColor - 20) + ", " + (nodeColor - 20) + ")";
    const childBackgroundColor = "rgb(" + (nodeColor + 20) + ", " + (nodeColor + 20) + ", " + (nodeColor + 20) + ")";

    return (
        <div className="node" style={nodeStyle} id={props.id} onMouseEnter={() => {
            Heap.highlightFamily(props.height, props.pos, props.maxHeight, "red", "rgb(0, 255, 0)");
        }} onMouseLeave={() => {
            Heap.highlightFamily(props.height, props.pos, props.maxHeight, parentBackgroundColor, childBackgroundColor);
        }}>
            <h1>{props.data}</h1>
        </div>
    )
}