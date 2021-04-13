import React from "react";
import "./index.css";

export default function Button(props) {
  const { children, variant = "primary", ...anotherProps } = props;
  return (
    <button className={`button-component ${variant}`} {...anotherProps}>
      {children}
    </button>
  );
}
