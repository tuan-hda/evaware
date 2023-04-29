import * as React from 'react'
import Svg, { Rect, SvgProps } from 'react-native-svg'

function LongDot(props: SvgProps) {
  return (
    <Svg width={11} height={5} viewBox='0 0 11 5' fill='none' {...props}>
      <Rect width={11} height={5} rx={2.5} fill='#212121' />
    </Svg>
  )
}

export default LongDot
