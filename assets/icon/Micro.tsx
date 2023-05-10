import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox='0 0 24 24' {...props}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9 5a3 3 0 116 0v6a3 3 0 11-6 0V5zm4 0v6a1 1 0 11-2 0V5a1 1 0 112 0z'
        fill='#212121'
      />
      <Path
        d='M6 9v4.5a4 4 0 004 4h1V22h2v-4.5h1a4 4 0 004-4V9h-2v4.5a2 2 0 01-2 2h-4a2 2 0 01-2-2V9H6z'
        fill='#212121'
      />
    </Svg>
  )
}

export default SvgComponent
