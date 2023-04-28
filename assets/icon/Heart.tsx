import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

function Heart(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox='0 0 32 32' {...props}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M5.216 5.894c3.132-2.724 7.944-2.484 10.77.551L16 6.46l.014-.015c2.826-3.035 7.639-3.275 10.77-.55 3.158 2.746 3.421 7.474.57 10.535L16.976 27.575a1.334 1.334 0 01-1.952 0L4.646 16.43c-2.851-3.061-2.588-7.789.57-10.536zm8.819 2.369c-1.841-1.977-5.016-2.143-7.07-.357-2.026 1.764-2.184 4.756-.368 6.706L16 24.71l9.403-10.098c1.816-1.95 1.658-4.942-.369-6.706-2.053-1.786-5.228-1.62-7.069.357l-.99 1.063a1.333 1.333 0 01-1.95 0l-.99-1.063z'
        fill={props.fill || '#000000'}
      />
    </Svg>
  )
}

export default Heart
