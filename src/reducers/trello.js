import { getFormattedDate } from "../utils";

const initialState = {
  cards: {},
};

const getCardListObject = (id) => ({
  id,
  title: "Click to add title",
  cardList: [],
});

const getCardObject = (id) => {
  const date = new Date();
  return {
    id,
    title: "Click to edit icon to add title",
    description: "Click on edit icon to add description",
    date,
    creationDate: getFormattedDate(date),
  };
};

const cloneCards = (state, listId) => ({
  cards: {
    ...state.cards,
    [listId]: {
      ...state.cards[listId],
    },
  },
});

const cloneCardList = (state, listId) => {
  const newCards = cloneCards(state, listId);
  newCards.cards[listId].cardList = [...newCards.cards[listId].cardList];

  return newCards;
};

export const trello = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CARD_LIST": {
      const id = new Date().getTime();

      return {
        ...state,
        cards: { ...state.cards, [id]: getCardListObject(id) },
      };
    }
    case "ADD_CARD": {
      const { listId } = action.value;
      const id = new Date().getTime();
      const newState = cloneCardList(state, listId);
      newState.cards[listId].cardList.splice(0, 0, getCardObject(id));

      return newState;
    }

    case "UPDATE_CARD_CONTENT": {
      const { listId, cardId, content } = action.value;
      const newCards = cloneCardList(state, listId);

      const idx = newCards.cards[listId].cardList.findIndex(
        (c) => c.id === cardId
      );
      newCards.cards[listId].cardList[idx] = {
        ...newCards.cards[listId].cardList[idx],
        ...content,
      };

      return newCards;
    }
    case "UPDATE_LIST_CONTENT": {
      const { listId, key, value } = action.value;
      const newCards = cloneCards(state, listId);
      newCards.cards[listId][key] = value;

      return newCards;
    }
    case "DELETE_LIST_OR_CARD": {
      const { listId, cardId } = action.value;
      const newCards = cloneCardList(state, listId);

      if (!cardId) {
        delete newCards.cards[listId];
      } else {
        const idx = newCards.cards[listId].cardList.findIndex(
          (c) => c.id === cardId
        );
        newCards.cards[listId].cardList.splice(idx, 1);
      }

      return newCards;
    }

    case "MOVE_CARD": {
      const { cardId, fromList, toList } = action.value;
      const newCards = cloneCardList(state, fromList);
      newCards.cards[toList] = {
        ...newCards.cards[toList],
        cardList: [...newCards.cards[toList].cardList],
      };

      const fromIdx = newCards.cards[fromList].cardList.findIndex(
        (c) => c.id === cardId
      );
      const card = newCards.cards[fromList].cardList[fromIdx];
      const toIdx = newCards.cards[toList].cardList.findIndex(
        (c) => c.date < card.date
      );

      const len = newCards.cards[toList].cardList.length;
      newCards.cards[toList].cardList.splice(
        toIdx === -1 ? len : toIdx,
        0,
        card
      );
      newCards.cards[fromList].cardList.splice(fromIdx, 1);

      return newCards;
    }
    default:
      return state;
  }
};
