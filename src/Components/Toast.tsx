import * as React from "react";

type Props = {
  children?: React.ReactNode;
};

function Toast(props: Props): JSX.Element {
  return (
    <div className="absolute top-0 right-0">
      <div className="p-4 w-48">
        <div className="rounded bg-blue-500 py-2 px-4 text-white font-semibold text-leg">{props.children}</div>
      </div>
    </div>
  );
}

export { Toast };
