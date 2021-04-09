import * as React from "react";

type Props = {
  onClick: () => void;
  children?: React.ReactNode;
};

function Button(props: Props): JSX.Element {
  return (
    <button
      type="button"
      className="flex border border-blue-500 items-center justify-center rounded-sm"
      onClick={props.onClick}
    >
      <span className="py-1 px-3 text-blue-800 text-xs">{props.children}</span>
    </button>
  );
}

export { Button };
