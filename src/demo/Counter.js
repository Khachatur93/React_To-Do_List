import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ChangeCounter from "./ChangeCounter";
import ShowCounter from "./ShowCounter";
export default function Counter() {
  return (
    <div>
      <ShowCounter />
      <ChangeCounter />
    </div>
  );
}
