import React from "react";
import "../style/divider.css";

export const Divider = ({ classes = "" }) => {
  return <div className={`divider ${classes}`} />;
};
