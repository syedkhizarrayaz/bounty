import React from "react";
import { useDrop } from "react-dnd";
import ITEM_TYPE from "../data/types";
import { statuses } from "../data";

// block of status
const DropWrapper = ({ onDrop, children, status }) => {
    const [{ isOver }, drop] = useDrop({
        accept: ITEM_TYPE,
        // for restriction of dropping item in columns
        canDrop: (item, monitor) =>  {
            const itemIndex = statuses.findIndex(si => si.status === item.status);
            // to check if the index is of neighbouring column
            const statusIndex = statuses.findIndex(si => si.status === status);
            return [itemIndex + 1, itemIndex - 1, itemIndex].includes(statusIndex);
        },
        drop: (item, monitor) => {
            onDrop(item, monitor, status);
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });

    return (
        <div ref={drop} className={"drop-wrapper"}>
            {/* wrapper for children cards */}
            {React.cloneElement(children, { isOver })}
        </div>
    )
};

export default DropWrapper;