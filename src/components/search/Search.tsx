import classNames from 'classnames'
import { View, TextInput, Image, ViewProps } from 'react-native'

const Search = (props: ViewProps) => {
  return (
    <View
      {...props}
      className={classNames(
        'h-16 flex-row items-center justify-center rounded-lg bg-giratina-100 p-4',
        props.className
      )}
    >
      <Image source={require('../../../assets/icon/search.png')} className='h-6 w-6' />
      <TextInput placeholder='Search' className='ml-4 mt-1 flex-1 font-app text-body1' selectionColor='#999' />
    </View>
  )
}

export default Search
