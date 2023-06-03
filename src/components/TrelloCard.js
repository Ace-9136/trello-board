import React from "react";
import { Card } from "antd";
import { Draggable } from "react-beautiful-dnd";
import "./App.css";

const TrelloCard = ({ text, id, index }) => {
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <div
          className="cardContainer"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card style={{ width: 284, marginBottom: 8 }}>
            <Card.Meta title={text} />
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default TrelloCard;
