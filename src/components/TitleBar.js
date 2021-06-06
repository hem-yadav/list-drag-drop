import React from "react";
import "../style/cardList.css";
import { Text, Icon } from ".";

const areEqual = (
  {
    showEditIcon: prevShowEditIcon,
    title: prevTitle,
    isEditable: prevIsEditable,
    isHighlight: prevIsHighlight,
  },
  {
    showEditIcon: nextShowEditIcon,
    title: nextTitle,
    isEditable: nextIsEditable,
    isHighlight: nextIsHighlight,
  }
) => {
  return (
    prevShowEditIcon === nextShowEditIcon &&
    prevTitle === nextTitle &&
    prevIsEditable === nextIsEditable &&
    prevIsHighlight === nextIsHighlight
  );
};

export const TitleBar = React.memo(
  ({
    classes,
    showEditIcon = true,
    title,
    onEditEnd,
    isEditable,
    deleteListener,
    isHighlight,
    editListener,
    saveListener,
  }) => {
    return (
      <div
        className={`flex-1 flex-align-center titleBar ${
          classes?.["wrapper"] || ""
        }`}
      >
        <Text
          {...{
            isHighlight,
            isEditable,
            onEditEnd,
            classes: "flex-1 text-weight-bold emptyError padding-vertical-s",
            text: title,
            metaData: { key: "title" },
          }}
        />
        <div className={`display-flex margin-left-m`}>
          {showEditIcon &&
            (isEditable ? (
              <Icon
                icon={"fa-check icon-s margin-right-m"}
                onClick={saveListener}
              />
            ) : (
              <Icon
                icon={"fa-pen icon-s margin-right-m"}
                onClick={editListener}
              />
            ))}
          <Icon icon={"fa-times icon-m"} onClick={deleteListener} />
        </div>
      </div>
    );
  },
  areEqual
);
