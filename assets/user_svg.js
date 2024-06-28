import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

function UserSvg(props) {
  return (
    <Svg
      fill="#004461"
      xmlns="http://www.w3.org/2000/svg"
      width="64px"
      height="64px"
      viewBox="-12.51 -12.51 150.09 150.09"
      xmlSpace="preserve"
      stroke="#004461"
      {...props}
    >
      <Circle cx={62.259} cy={12.942} r={12.942} />
      <Path d="M89.589 65.152c-3.005-20.494-7.554-29.271-18.724-36.117-.216-.133-.445-.227-.672-.326a15.02 15.02 0 00-4.712-2.074l-3.224 3.246-3.125-3.281-.032.006c-2.392.572-4.717 1.785-6.535 3.488-9.976 6.711-14.227 15.603-17.079 35.058a5.024 5.024 0 009.943 1.457c1.026-6.998 2.214-12.111 3.583-15.978v15.822c0 1.353.262 2.613.723 3.771-.036.263-.06.525-.06.795l.004 48.117a5.937 5.937 0 005.938 5.937 5.937 5.937 0 005.938-5.938l-.003-41.291c.235.01.47.029.707.029.046 0 .092-.006.139-.006l-.001 41.27a5.938 5.938 0 005.937 5.938h.001a5.938 5.938 0 005.938-5.938l.002-47.819a10.146 10.146 0 001.23-4.861V49.148c1.608 4.012 2.979 9.527 4.143 17.461a5.027 5.027 0 005.701 4.242 5.021 5.021 0 004.24-5.699z" />
    </Svg>
  );
}

export default UserSvg;
