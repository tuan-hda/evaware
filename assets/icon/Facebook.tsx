import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function Facebook(props: SvgProps) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <Path
        d="M13.382 3.854c-1.116 0-1.433.495-1.433 1.586v1.801h2.968l-.292 2.918h-2.677V19H8.396v-8.841H6V7.24h2.397V5.49C8.397 2.546 9.577 1 12.887 1c.711 0 1.561.056 2.069.127v2.74"
        fill="#3C5A99"
      />
    </Svg>
  )
}

export default Facebook
