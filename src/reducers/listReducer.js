import { CONSTANTS } from "../actions";
let listID = 3;
let cardID = 0;
const initialState = [
  {
    title: "To-do",
    id: `list-${0}`,
    cards: [],
  },
  {
    title: "In Progress",
    id: `list-${1}`,
    cards: [],
  },
  {
    title: "Completed",
    id: `list-${2}`,
    cards: [],
  },
];

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST:
      const newList = {
        title: action.payload,
        cards: [],
        id: `list-${listID}`,
      };
      listID += 1;
      return [...state, newList];

    case CONSTANTS.ADD_CARD: {
      const newCard = {
        text: action.payload.text,
        id: `card-${cardID}`,
      };
      cardID += 1;

      const newState = state.map((list) => {
        if (list.id === action.payload.listID) {
          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        } else {
          return list;
        }
      });
      return newState;
    }

    case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        type,
      } = action.payload;

      const newState = [...state];
      if (type === "list") {
        const list = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...list);
        return newState;
      }
      const listStart = newState.find((list) => list.id === droppableIdStart);
      const card = listStart.cards[droppableIndexStart];

      listStart.cards.splice(droppableIndexStart, 1);

      const listEnd = newState.find((list) => list.id === droppableIdEnd);

      listEnd.cards.splice(droppableIndexEnd, 0, card);

      return newState;

    default:
      return state;
  }
};

export default listReducer;
