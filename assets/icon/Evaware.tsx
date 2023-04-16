import * as React from 'react'
import Svg, { Circle, Path, SvgProps } from 'react-native-svg'

function Evaware(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox='0 0 32 32' {...props} fill='none'>
      <Circle cx={15.2} cy={16.4285} r={2.97143} fill={props.fill || '#000000'} />
      <Path
        d='M22.764 11.139c.723-.47 1.084-.704 1.454-.626.37.079.606.44 1.075 1.163l.747 1.15-9.557 6.207a1.23 1.23 0 01-1.702-.362 1.97 1.97 0 01.579-2.724l7.404-4.808zM20.832 26.204a2.345 2.345 0 01-3.152-.713l-.709-1.063 3-1.5 2.5-1.5 3.879-2.615v3.726l-3.379 2.39-2.139 1.275z'
        fill={props.fill || '#000000'}
      />
      <Path d='M20.024 24.81a9.715 9.715 0 114.519-11.53' stroke={props.fill || '#000000'} strokeWidth={3.2} />
    </Svg>
  )
}

export default Evaware
