import { View, Text, ViewProps } from 'react-native'

const Brand = (props: ViewProps) => {
  return (
    <View {...props} className={props.className}>
      <Text className='-mt-1 font-app-semibold text-heading1 leading-[42]'>evaware</Text>
    </View>
  )
}

export default Brand
