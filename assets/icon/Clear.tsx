import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

function SvgComponent({ fill = '#000', ...props }: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox='0 0 24 24' fill={fill} {...props}>
      <Path
        d='M7.793 9.207L10.586 12l-2.793 2.793 1.414 1.414L12 13.414l2.793 2.793 1.414-1.414L13.414 12l2.793-2.793-1.414-1.414L12 10.586 9.207 7.793 7.793 9.207z'
        fill={fill}
      />
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-2 0a8 8 0 11-16 0 8 8 0 0116 0z'
        fill={fill}
      />
    </Svg>
  )
}

export default SvgComponent
