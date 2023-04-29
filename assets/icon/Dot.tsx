import * as React from 'react'
import Svg, { Rect, SvgProps } from 'react-native-svg'

function Dot(props: SvgProps) {
  return (
    <Svg width={5} height={5} viewBox='0 0 5 5' fill='none' {...props}>
      <Rect width={5} height={5} rx={2.5} fill='#E0E0E0' />
    </Svg>
  )
}

export default Dot
