import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

function Star(props:SvgProps) {
  return (
    <Svg width={16} height={16} viewBox='0 0 16 16' fill='none' {...props}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8 1.333c.253 0 .483.143.596.369l1.846 3.691 3.993.615a.667.667 0 01.344 1.154L11.738 9.9l.912 3.951a.667.667 0 01-.986.726L8 12.438l-3.664 2.138a.667.667 0 01-.986-.726l.912-3.95-3.041-2.738a.667.667 0 01.344-1.154l3.993-.615 1.846-3.691A.667.667 0 018 1.333zm0 2.158L6.596 6.298a.667.667 0 01-.495.36l-2.943.454 2.288 2.06c.18.161.258.408.204.644l-.654 2.83 2.668-1.555a.667.667 0 01.672 0l2.668 1.556-.654-2.83a.667.667 0 01.204-.646l2.288-2.06L9.9 6.66a.667.667 0 01-.495-.36L8 3.49z'
        fill='#E0E0E0'
      />
    </Svg>
  )
}

export default Star
