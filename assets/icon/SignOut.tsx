import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox='0 0 24 24' {...props}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M17.707 7.293l4 4a1 1 0 010 1.414l-4 4-1.414-1.414L18.586 13H7v-2h11.586l-2.293-2.293 1.414-1.414z'
        fill='#212121'
      />
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 4a8 8 0 103.555 15.169l.89 1.791A9.963 9.963 0 0112 22C6.477 22 2 17.523 2 12S6.477 2 12 2c1.595 0 3.105.374 4.445 1.04l-.89 1.791A7.963 7.963 0 0012 4z'
        fill='#212121'
      />
    </Svg>
  )
}

export default SvgComponent
