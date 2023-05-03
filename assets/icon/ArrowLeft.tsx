import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox='0 0 24 24' fill='none' {...props}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M5.414 13l5.793 5.793-1.414 1.414-7.5-7.5a1 1 0 010-1.414l7.5-7.5 1.414 1.414L5.414 11H22v2H5.414z'
        fill='#212121'
      />
    </Svg>
  )
}

export default SvgComponent
