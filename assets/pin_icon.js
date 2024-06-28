import * as React from "react"
import Svg, {G, Path } from "react-native-svg"

function PinIcon(props) {
  return (
    <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    {...props}
  >
    <G
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M12 21c3.5-3.6 7-6.824 7-10.8C19 6.224 15.866 3 12 3s-7 3.224-7 7.2 3.5 7.2 7 10.8z" />
      <Path d="M12 12a2 2 0 100-4 2 2 0 000 4z" />
    </G>
  </Svg>
  )
}

export default PinIcon;