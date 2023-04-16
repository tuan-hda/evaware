import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

function Bag(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox='0 0 32 32' {...props} fill='none'>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16 2.667A5.333 5.333 0 0010.667 8v1.333H9.333a4 4 0 00-4 4v12a4 4 0 004 4h13.334a4 4 0 004-4v-12a4 4 0 00-4-4h-1.334V8A5.333 5.333 0 0016 2.667zM18.667 12v2.667h2.666V12h1.334c.736 0 1.333.597 1.333 1.333v12c0 .737-.597 1.334-1.333 1.334H9.333A1.333 1.333 0 018 25.333v-12C8 12.597 8.597 12 9.333 12h1.334v2.667h2.666V12h5.334zm0-2.667V8a2.667 2.667 0 00-5.334 0v1.333h5.334z'
        fill={props.fill || '#000'}
      />
    </Svg>
  )
}

export default Bag
