import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

function ChevronRight(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox='0 0 24 24' fill='none' {...props}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14.586 12l-6.793 6.793 1.414 1.414 7.5-7.5a1 1 0 000-1.414l-7.5-7.5-1.414 1.414L14.586 12z'
        fill='#212121'
      />
    </Svg>
  )
}

export default ChevronRight
