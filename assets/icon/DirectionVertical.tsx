import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

function DirectionVertical(props: SvgProps) {
  return (
    <Svg width={18} height={18} viewBox='0 0 18 18' fill='none' {...props}>
      <Path
        d='M16.28 6.22l-3-3a.75.75 0 00-1.06 0l-3 3 1.06 1.06L12 5.56v8.69h1.5V5.56l1.72 1.72 1.06-1.06zM7.72 10.72L6 12.44V3.75H4.5v8.69l-1.72-1.72-1.06 1.06 3 3a.75.75 0 001.06 0l3-3-1.06-1.06z'
        fill='#212121'
      />
    </Svg>
  )
}

export default DirectionVertical
