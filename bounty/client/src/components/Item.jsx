import React, { Fragment, useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import ITEM_TYPE from "../data/types";

// for moving items between and across columns
const Item = ({ item, index, moveItem, status }) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            // index column
            const dragIndex = item.index;
            const hoverIndex = index;

            // if it is same item
            if (dragIndex === hoverIndex) {
                return
            }
            // position and mouse position on screen
            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;
            // if card is half way hovered for downward
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // if card is half way hovered for upward
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // changing card index
            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });
    // if item is dragging
    const [{ isDragging }, drag] = useDrag({
        item: { type: ITEM_TYPE, ...item, index },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    const [show, setShow] = useState(false);

    const onOpen = () => setShow(true);

    const onClose = () => setShow(false);

    drag(drop(ref));

    return (
        <Fragment>
            {/* if dragged then show */}
            <div
                ref={ref}
                style={{ opacity: isDragging ? 0 : 1 }}
                className={"item"}
                onClick={onOpen}
            >   
                {/* card block */}
                <div className={"color-bar"} style={{ backgroundColor: status.color }}/>
                <p className={"item-title"}>{item.content}</p>
                <p className={"item-status"}>{item.icon}</p>
            </div>
        </Fragment>
    );
};

export default Item;