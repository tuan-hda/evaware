import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

function Minus(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox='0 0 20 20' {...props}>
      <Path fillRule='evenodd' clipRule='evenodd' d='M17.5 10.833h-15V9.167h15v1.666z' fill={props.fill} />
    </Svg>
  )
}

export default Minus
