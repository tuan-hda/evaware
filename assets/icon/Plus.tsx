import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

function Plus(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox='0 0 20 20' {...props}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.167 9.167V2.5h1.666v6.667H17.5v1.666h-6.667V17.5H9.167v-6.667H2.5V9.167h6.667z'
        fill={props.fill}
      />
    </Svg>
  )
}

export default Plus
