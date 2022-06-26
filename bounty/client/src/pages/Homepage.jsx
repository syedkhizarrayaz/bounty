import React, { useState } from "react";
import Item from "../components/Item";
import DropWrapper from "../components/DropWrapper";
import Col from "../components/Col";
import { data, statuses } from "../data";

const Homepage = () => {
    // items object
    const [items, setItems] = useState(data);
    // changing the statues w.r.t columns
    const onDrop = (item, monitor, status) => {
        const mapping = statuses.find(si => si.status === status);
        // filtering the dropped item
        setItems(prevState => {
            const newItems = prevState
                .filter(i => i.id !== item.id)
                // setting new status and new column
                .concat({ ...item, status, icon: mapping.icon });
            return [ ...newItems ];
        });
    };
    // setting up moving card index
    const moveItem = (dragIndex, hoverIndex) => {
        const item = items[dragIndex];
        setItems(prevState => {
            // dragged item to hover index
            const newItems = prevState.filter((i, idx) => idx !== dragIndex);
            newItems.splice(hoverIndex, 0, item);
            return  [ ...newItems ];
        });
    };

    return (
        // to show columns with child cards in it
        <div className={"row"}>
            {statuses.map(s => {
                return (
                    <div key={s.status} className={"col-wrapper"}>
                        <h2 className={"col-header"}>{s.status.toUpperCase()}</h2>
                        <DropWrapper onDrop={onDrop} status={s.status}>
                            <Col>
                            {/* showing items with status */}
                                {items
                                    .filter(i => i.status === s.status)
                                    .map((i, idx) => <Item key={i.id} item={i} index={idx} moveItem={moveItem} status={s} />)
                                }
                            </Col>
                        </DropWrapper>
                    </div>
                );
            })}
        </div>
        
    );
};

export default Homepage;