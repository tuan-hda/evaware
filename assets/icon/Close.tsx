import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function Close(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.586 12L3.293 4.707l1.414-1.414L12 10.586l7.293-7.293 1.414 1.414L13.414 12l7.293 7.293-1.414 1.414L12 13.414l-7.293 7.293-1.414-1.414L10.586 12z"
        fill="#212121"
      />
    </Svg>
  )
}

export default Close
