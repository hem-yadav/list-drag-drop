import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TitleBar, Text } from ".";
import "../style/card.css";

export const Card = React.memo(({ data = {}, listId }) => {
  const { title, description, creationDate } = data;

  const [isEditable, setEditable] = useState(false);
  const [content, setContent] = useState({ title, description });

  const dispatch = useDispatch();

  const onEditEnd = (updatedData) => {
    if (updatedData.value !== data[updatedData.key]) {
      setContent({ ...content, [updatedData.key]: updatedData.value });
    }
  };

  const dragStarted = (ev) => {
    ev.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ fromList: listId, cardId: data.id })
    );
  };

  const saveListener = () => {
    if (content.title && content.description) {
      if (
        content.title !== data.title ||
        content.description !== data.description
      ) {
        dispatch({
          type: "UPDATE_CARD_CONTENT",
          value: { content, cardId: data.id, listId },
        });
      }
      setEditable(false);
    }
  };

  const editListener = () => {
    setEditable(true);
  };

  const deleteCard = () =>
    dispatch({
      type: "DELETE_LIST_OR_CARD",
      value: { listId, cardId: data.id },
    });

  return (
    <div onDragStart={dragStarted} className="card" draggable="true">
      <TitleBar
        {...{
          title,
          isEditable,
          setEditable,
          deleteListener: deleteCard,
          isHighlight: isEditable,
          onEditEnd,
          saveListener,
          editListener,
        }}
      />
      <Text
        isEditable={isEditable}
        isHighlight={isEditable}
        metaData={{ key: "description" }}
        onEditEnd={onEditEnd}
        {...{ text: description, classes: "margin-vertical-s emptyError" }}
      />
      <Text
        {...{
          text: creationDate,
          classes: "subscript text-align-right",
        }}
      />
    </div>
  );
});
