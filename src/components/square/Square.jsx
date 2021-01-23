import React from 'react';
import './Square.css';

function Square(props) {
  return (
    <button className={((props.value === "X") ? "square Xed " : (props.value === "O") ? "square Oed " : "square ") + props.next} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;