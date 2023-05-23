import { ArrowLeft, Micro } from 'assets/icon'
import classNames from 'classnames'
import { Image, Text, View, TouchableWithoutFeedbackProps, TouchableWithoutFeedback } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import TextField from './TextField'

type Props = TouchableWithoutFeedbackProps & {
  isSearching?: boolean
  onBack?: () => void
}

const SearchBar = ({ isSearching, onBack, ...props }: Props) => {
  const navigation = useNavigation()

  if (isSearching)
    return (
      <TextField
        className={props.className}
        placeholder='Search something...'
        onLeftIconPress={() => (onBack ? onBack() : navigation.goBack())}
        icon={<ArrowLeft />}
        rightIcon={<Micro />}
      />
    )

  return (
    <TouchableWithoutFeedback disabled={isSearching} {...props} className={classNames('flex-row', props.className)}>
      <View className='h-16 w-full flex-row items-center justify-center rounded-lg bg-giratina-100 p-4 '>
        <Image source={require('../../../assets/icon/search.png')} className='h-6 w-6' />
        <Text className='ml-4 flex-1 font-app text-body1 text-[#999]'>Search</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default SearchBar
