import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

function Check(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox='0 0 16 16' fill='none' {...props}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M13.471 4.805l-7 7a.667.667 0 01-.942 0l-3-3 .942-.943L6 10.39l6.529-6.528.942.943z'
        fill='#212121'
      />
    </Svg>
  )
}

export default Check
