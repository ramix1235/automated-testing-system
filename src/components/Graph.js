import React, { PureComponent } from 'react';
import { Graph as ReactGraph } from "react-d3-graph";

const graphConfig = {
    nodeHighlightBehavior: true,
    node: {
        color: "#1DA57A",
        fontColor: "#828282",
        size: 120
    },
};

export default class Graph extends PureComponent {
    componentDidCatch(error, errorInfo) {
        console.log(error);
        console.log(errorInfo);

        // window.location.reload();
    }

    render() {
        const {
            id,
            data
        } = this.props;

        return (
            <ReactGraph
                id={id}
                data={data}
                config={graphConfig}
            />
        );
    }
}