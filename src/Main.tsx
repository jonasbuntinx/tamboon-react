import * as React from "react";
import { render } from "react-dom";
import { App } from "./App";

function main(): void {
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("app")
  );
}

export { main };
