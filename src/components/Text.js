export const Text = ({
  text,
  isEditable = false,
  onEditEnd,
  metaData,
  classes = "",
  isHighlight = false,
}) => {
  const onDivBlur = (e) => {
    onEditEnd?.({ ...metaData, value: e.target.innerText });
  };

  return (
    <div
      suppressContentEditableWarning={true}
      onBlur={onDivBlur}
      contentEditable={isEditable ? "true" : "false"}
      className={`text ${classes} ${
        isHighlight ? "editable padding-vertical-s" : ""
      }`}
    >
      {text}
    </div>
  );
};
