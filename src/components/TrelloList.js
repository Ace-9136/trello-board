import React from "react";
import "./App.css";
import TrelloCard from "./TrelloCard";
import ActionButton from "./ActionButton";
import { Draggable, Droppable } from "react-beautiful-dnd";

const TrelloList = ({ title, cards, listID, index }) => {
  return (
    <Draggable draggableId={listID} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="List"
        >
          <Droppable droppableId={listID}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <h4>{title}</h4>
                {cards.map((card, index) => {
                  return (
                    <TrelloCard
                      key={card.id}
                      index={index}
                      text={card.text}
                      id={card.id}
                    />
                  );
                })}
                {provided.placeholder}
                <ActionButton listID={listID} />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default TrelloList;
