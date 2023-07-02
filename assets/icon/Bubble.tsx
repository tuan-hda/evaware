import * as React from 'react'
import Svg, { Circle, SvgProps } from 'react-native-svg'

function Bubble(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox='0 0 24 24' fill='none' {...props}>
      <Circle cx={17} cy={8} r={4} stroke='#33363F' strokeWidth={2} />
      <Circle cx={12} cy={17} r={3} stroke='#33363F' strokeWidth={2} />
      <Circle cx={6.5} cy={9.5} r={2.5} stroke='#33363F' strokeWidth={2} />
    </Svg>
  )
}

export default Bubble
