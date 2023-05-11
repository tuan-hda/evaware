import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function Car(props: SvgProps) {
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
        d="M6.808 3a2 2 0 00-1.955 1.58l-1.217 5.678a1.998 1.998 0 00-.807.848l-.618 1.236a2 2 0 00-.211.894V19a2 2 0 002 2h2a2 2 0 002-2h8a2 2 0 002 2h2a2 2 0 002-2v-5.764c0-.31-.072-.617-.211-.894l-.618-1.236a1.998 1.998 0 00-.807-.848L19.147 4.58A2 2 0 0017.192 3H6.808zM20 13.5h-3a1 1 0 100 2h3V19h-2v-2H6v2H4v-3.5h3a1 1 0 100-2H4v-.264L4.618 12h14.764L20 13.236v.264zM18.263 10l-1.071-5H6.808l-1.071 5h12.526z"
        fill="#212121"
      />
    </Svg>
  )
}

export default Car
