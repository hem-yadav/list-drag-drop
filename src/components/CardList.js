import React from "react";
import { useDispatch } from "react-redux";
import "../style/cardList.css";
import { Divider, Card, Icon, TitleBar } from ".";

export const CardList = React.memo((props) => {
  const { data: { cardList = [], title } = {}, classes = {}, listId } = props;
  const dispatch = useDispatch();

  const deleteList = () =>
    dispatch({
      type: "DELETE_LIST_OR_CARD",
      value: { listId },
    });

  const addCard = () =>
    dispatch({
      type: "ADD_CARD",
      value: { listId },
    });

  const onEditEnd = (updatedData) => {
    if (updatedData?.value && updatedData.value !== title) {
      dispatch({
        type: "UPDATE_LIST_CONTENT",
        value: { listId, ...updatedData },
      });
    }
  };

  const onDrop = (ev) => {
    ev.preventDefault();
    const cardData = JSON.parse(ev.dataTransfer.getData("text/plain"));
    if (!!cardData.fromList && listId !== cardData.fromList) {
      dispatch({ type: "MOVE_CARD", value: { ...cardData, toList: listId } });
    }
  };

  return (
    <div className={`cardList ${classes["wrapper"] || ""}`}>
      <div>
        <TitleBar
          {...{
            title,
            showEditIcon: false,
            classes: { wrapper: "margin-horizontal-m" },
            onEditEnd,
            isEditable: true,
            deleteListener: deleteList,
            isHighlight: false,
          }}
        />
        <Divider classes={"margin-vertical-m"} />
        <div
          onDragOver={(ev) => ev.preventDefault()}
          onDrop={onDrop}
          className={"margin-horizontal-m scrollable"}
        >
          {cardList?.map((card) => (
            <Card
              key={card.id}
              {...{
                data: card,
                listId,
              }}
            />
          ))}
        </div>
      </div>
      <Icon icon={"fa-plus-circle"} onClick={addCard} />
    </div>
  );
});
