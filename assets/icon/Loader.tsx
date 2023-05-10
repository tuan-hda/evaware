import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox='0 0 24 24' {...props}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 4a8 8 0 108 8h2c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2a9.973 9.973 0 017.141 3l-1.428 1.4A7.973 7.973 0 0012 4z'
        fill='#fff'
      />
    </Svg>
  )
}

export default SvgComponent
