import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

function HeartFilled(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox='0 0 24 24' {...props} fill='none'>
      <Path
        d='M11.99 4.834c-2.12-2.276-5.73-2.456-8.078-.413-2.369 2.06-2.566 5.605-.428 7.901l7.784 8.36a1 1 0 001.464 0l7.784-8.36c2.138-2.296 1.94-5.84-.428-7.901-2.349-2.043-5.958-1.863-8.078.413l-.01.011-.01-.01z'
        fill='#000000'
      />
    </Svg>
  )
}

export default HeartFilled
