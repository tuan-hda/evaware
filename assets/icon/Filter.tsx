import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

function Filter(props: SvgProps) {
  return (
    <Svg width={18} height={18} viewBox='0 0 18 18' fill='none' {...props}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M5.25 8.25A3.001 3.001 0 008.155 6h7.595V4.5H8.155a3.001 3.001 0 00-5.905.75 3 3 0 003 3zm0-1.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM9.845 12a3.001 3.001 0 110 1.5H2.25V12h7.595zm4.405.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z'
        fill='#212121'
      />
    </Svg>
  )
}

export default Filter
