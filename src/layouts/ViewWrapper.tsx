import { useIsFetching } from '@tanstack/react-query'
import { View, Text, ViewProps } from 'react-native'
import LoadingScreen from '~/components/common/LoadingScreen'

const ViewWrapper = ({ children, ...props }: ViewProps) => {
  return (
    <View {...props} className='h-full w-full'>
      {children}
    </View>
  )
}

export default ViewWrapper
