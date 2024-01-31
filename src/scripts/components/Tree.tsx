import React from "react";

import Node from "./Node";

export default function Tree(props: {
    height: number
}) {
    const nodes = [];
    for (let i = 1; i <= props.height; i++) {
        for (let j = 1; j <= Math.pow(2, i - 1); j++) {
            nodes.push(
            <Node 
                data={Math.round(Math.random() * 100)} 
                height={i} 
                pos={j}
                id = {i + "-" + j}
                key = {i + "-" + j}
                maxHeight={props.height}
            />
            )
        }
    }

    return (
        <div className="container">
            {nodes}
        </div>
    )
}