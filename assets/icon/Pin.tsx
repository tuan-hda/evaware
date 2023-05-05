import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

function Pin(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox='0 0 24 24' fill='none' {...props}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 15a4 4 0 100-8 4 4 0 000 8zm2-4a2 2 0 11-4 0 2 2 0 014 0z'
        fill='#212121'
      />
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M21 11c0 4.97-6 11.5-9 11.5S3 15.97 3 11a9 9 0 0118 0zm-2 0c0 1.799-1.157 4.225-2.913 6.335-.846 1.017-1.75 1.86-2.563 2.43-.882.617-1.4.735-1.524.735-.124 0-.642-.117-1.524-.736-.813-.57-1.717-1.412-2.564-2.43C6.157 15.226 5 12.8 5 11a7 7 0 0114 0z'
        fill='#212121'
      />
    </Svg>
  )
}

export default Pin
