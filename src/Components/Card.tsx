import * as React from "react";
import { IMAGES_ENDPOINT } from "../Env";

type Props = {
  image: string;
  overlay?: React.ReactNode;
  children?: React.ReactNode;
};

function Card(props: Props): JSX.Element {
  const containerClass = "flex flex-col";

  const overlayClass = props.overlay ? "opacity-10" : "";

  return (
    <div className="h-full w-full bg-white shadow-md border border-gray-200 overflow-hidden rounded relative">
      <div className={[containerClass, overlayClass].join(" ")}>
        <img className="h-64 object-cover" src={IMAGES_ENDPOINT + props.image} />
        <p className="flex items-center p-4">{props.children}</p>
      </div>
      {props.overlay ? <div className="absolute inset-0">{props.overlay}</div> : <></>}
    </div>
  );
}

export { Card };
