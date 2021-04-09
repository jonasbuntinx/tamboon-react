import * as React from "react";
import { render } from "react-dom";

function main(): void {
  render(<React.StrictMode></React.StrictMode>, document.getElementById("app"));
}

export { main };
