import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { Donate } from "../Components/Donate";

describe("<Donate/>", () => {
  it("should return the amount (10) when clicking the Pay button", async () => {
    const mockFn = jest.fn();

    render(
      <Donate
        currency="JPY"
        onClose={() => {
          return;
        }}
        onClick={mockFn}
      />
    );

    fireEvent.click(screen.getByText("Pay"));

    expect(mockFn).toHaveBeenCalledWith(10);
  });
});
