import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

function HoleSvg(props) {
  return (
    <Svg
      width={"50px"}
      height={"50px"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M5.312 10.761C8.23 5.587 9.689 3 12 3c2.31 0 3.77 2.587 6.688 7.761l.364.645c2.425 4.3 3.638 6.45 2.542 8.022S17.786 21 12.364 21h-.728c-5.422 0-8.134 0-9.23-1.572s.117-3.722 2.542-8.022l.364-.645z"
        stroke="#b80000"
        strokeWidth={1.5}
      />
      <Path
        d="M12 8v5"
        stroke="#b80000"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Circle cx={12} cy={16} r={1} fill="#b80000" />
    </Svg>
  );
}

export default HoleSvg;
