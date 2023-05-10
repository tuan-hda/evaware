import * as React from 'react'
import Svg, { Circle, Path, SvgProps } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox='0 0 24 24' {...props}>
      <Circle cx={16} cy={12} r={6} fill='#FFCF53' />
      <Circle cx={8} cy={12} r={6} fill='#FF5959' />
      <Path
        d='M12 16.472A5.985 5.985 0 0014 12a5.985 5.985 0 00-2-4.472A5.985 5.985 0 0010 12c0 1.777.773 3.374 2 4.472z'
        fill='#FF7E35'
      />
    </Svg>
  )
}

export default SvgComponent
