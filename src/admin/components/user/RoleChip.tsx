import { View, Text } from 'react-native'
import React from 'react'

const RoleChip = ({ role }: { role: string }) => {
  return (
    <View>
      {role === 'staff' && (
        <View className='rounded-lg bg-gengar-100/50 p-2'>
          <Text className='font-app-medium text-gengar-500'>Staff</Text>
        </View>
      )}

      {role === 'admin' && (
        <View className='rounded-lg bg-venusaur-100/50 p-2'>
          <Text className='font-app-medium text-venusaur-500'>Admin</Text>
        </View>
      )}
    </View>
  )
}

export default RoleChip
