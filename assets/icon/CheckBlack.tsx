import * as React from "react"
import Svg, { Circle, Path, SvgProps } from "react-native-svg"

function CheckBlack(props: SvgProps) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <Circle cx={10} cy={10} r={10} fill="#000" />
      <Path d="M5.5 9.5L9 13l5.5-5.5" stroke="#fff" strokeWidth={1.5} />
    </Svg>
  )
}

export default CheckBlack
