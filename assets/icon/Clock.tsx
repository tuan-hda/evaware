import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox='0 0 24 24' {...props}>
      <Path d='M13 12V7h-2v7h6v-2h-4z' fill='#212121' />
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-2 0a8 8 0 11-16 0 8 8 0 0116 0z'
        fill='#212121'
      />
    </Svg>
  )
}

export default SvgComponent
