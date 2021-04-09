import * as React from "react";
import { Button } from "./Button";

type Props = {
  currency: string;
  onClose: () => void;
  onClick: (amount: number) => void;
};

function Donate(props: Props): JSX.Element {
  const [selectedAmount, setSelectedAmount] = React.useState<number>(10);

  return (
    <div className="h-full text-sm font-medium text-gray-700 relative">
      <div className="h-full flex flex-col space-y-4 items-center justify-center">
        <p>Select the amount to donate ({props.currency})</p>
        <div className="flex space-x-3">
          {[10, 20, 50, 100, 500].map((amount, j) => (
            <label className="flex space-x-1 items-center" key={j}>
              <input
                type="radio"
                name="payment"
                checked={amount == selectedAmount}
                onChange={() => setSelectedAmount(amount)}
              />
              <span>{amount}</span>
            </label>
          ))}
        </div>
        <Button onClick={() => props.onClick(selectedAmount)}>Pay</Button>
      </div>
      <div className="absolute cursor-pointer top-0 right-0 px-3 py-2" onClick={() => props.onClose()}>
        x
      </div>
    </div>
  );
}

export { Donate };
