import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

function YellowStar(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox='0 0 16 16' fill='none' {...props}>
      <Path
        d='M8.596 1.702a.667.667 0 00-1.192 0L5.558 5.393l-3.993.615a.667.667 0 00-.344 1.154L4.262 9.9 3.35 13.85a.667.667 0 00.986.726L8 12.438l3.664 2.138a.667.667 0 00.986-.726l-.912-3.95 3.041-2.738a.667.667 0 00-.344-1.154l-3.993-.615-1.846-3.691z'
        fill='#FEE440'
      />
    </Svg>
  )
}

export default YellowStar
