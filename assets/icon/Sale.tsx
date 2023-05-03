import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

function Sale(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox='0 0 24 24' fill='none' {...props}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7 11a4 4 0 100-8 4 4 0 000 8zm0-2a2 2 0 100-4 2 2 0 000 4z'
        fill='#212121'
      />
      <Path d='M4.293 18.293l14-14 1.414 1.414-14 14-1.414-1.414z' fill='#212121' />
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M21 17a4 4 0 11-8 0 4 4 0 018 0zm-2 0a2 2 0 11-4 0 2 2 0 014 0z'
        fill='#212121'
      />
    </Svg>
  )
}

export default Sale
