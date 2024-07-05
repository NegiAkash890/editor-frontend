import * as React from "react";
const Copy = (props) => (
  <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect fill="none" height={256} width={256} />
    <polyline
      fill="none"
      points="216 184 216 40 72 40"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
    />
    <rect
      fill="none"
      height={144}
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
      width={144}
      x={40}
      y={72}
    />
  </svg>
);
export default Copy;
