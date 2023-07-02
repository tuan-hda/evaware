import * as React from 'react'
import Svg, { Path, Rect, SvgProps } from 'react-native-svg'

function Copy(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox='0 0 24 24' fill='none' {...props}>
      <Path
        d='M14 7v0c0-.932 0-1.398-.152-1.765a2 2 0 00-1.083-1.083C12.398 4 11.932 4 11 4H8c-1.886 0-2.828 0-3.414.586C4 5.172 4 6.114 4 8v3c0 .932 0 1.398.152 1.765a2 2 0 001.083 1.083C5.602 14 6.068 14 7 14v0'
        stroke='#33363F'
        strokeWidth={2}
      />
      <Rect x={10} y={10} width={10} height={10} rx={2} stroke='#33363F' strokeWidth={2} />
    </Svg>
  )
}

export default Copy
