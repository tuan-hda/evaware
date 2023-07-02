import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { AppBar, Button, CustomSafeAreaView } from '~/components/common'
import RewardItem from '~/components/point/RewardItem'
import { getAltCurrentUserProfileService } from '~/services/user'
import { useQuery } from '@tanstack/react-query'
import { Copy } from 'assets/icon'
import { appService } from '~/services/base'
import { callAxios } from '~/utils/callAxios'
import * as Clipboard from 'expo-clipboard'

const rewardList = [
  { percent: 2, points: 1000 },
  { percent: 3, points: 1500 },
  { percent: 5, points: 2500 },
  { percent: 7, points: 4000 },
  { percent: 10, points: 8000 },
  { percent: 15, points: 15000 }
]
const PointScreen = () => {
  const { data: temp, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: getAltCurrentUserProfileService
  })
  const [selected, setSelected] = useState(0)
  const [disabled, setDisabled] = useState(true)
  const data = temp?.data

  const find_voucher = useCallback(() => {
    return data?.reward_vouchers.find((item) => item.level === selected + 1)?.code
  }, [data?.reward_vouchers, selected])

  useEffect(() => {
    if ((data?.points || 0) < rewardList[selected].points) {
      setDisabled(true)
      return
    }
    if (find_voucher() === undefined) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [data, selected, find_voucher])

  const getVoucher = async () => {
    if (disabled) return
    await callAxios(
      appService.post('/voucher/create-reward', {
        level: selected + 1
      })
    )
    await refetch()
  }

  return (
    <CustomSafeAreaView className='bg-giratina-100'>
      <ScrollView>
        <AppBar title='Your points' />
        <View className='flex-1 px-4 pt-4'>
          <View className='h-32 w-full items-center justify-center rounded-t-xl bg-charizard-500 bg-gradient-to-br shadow-inner'>
            <Text className='font-app-semibold text-heading1 text-black'>{data?.points}</Text>
            <Text className='font-app text-body1 text-black/70'>points</Text>
          </View>

          <View className='rounded-b-xl bg-white py-6'>
            <FlatList
              horizontal={true}
              data={rewardList}
              showsHorizontalScrollIndicator={false}
              ListHeaderComponent={<View className='w-4' />}
              ListFooterComponent={<View className='w-4' />}
              ItemSeparatorComponent={() => <View className='w-2' />}
              renderItem={({ item, index }) => (
                <RewardItem
                  onPress={() => setSelected(index)}
                  selected={index === selected}
                  points={item.points}
                  data={item.percent}
                />
              )}
            />

            <View className='px-4'>
              <View className='h-6' />
              <Text className='font-app-medium text-body1'>{rewardList[selected].percent}% discount</Text>
              <Text className='font-app text-body2 text-black/70'>
                You need to gain {rewardList[selected].points} points to unlock this voucher
              </Text>

              <Text className='mt-4 font-app-medium text-body1'>Code</Text>
              <View className='flex-row items-center'>
                <Text className='font-app text-body1 text-gengar-500'>{find_voucher() || 'Get your code'}</Text>
                <View className='w-2' />
                <TouchableOpacity onPress={() => Clipboard.setString(find_voucher() || '')}>
                  <Copy />
                </TouchableOpacity>
                <View className='flex-1' />
                <Button onPress={getVoucher} label='Get voucher' disabled={disabled} className='w-32' size='small' />
              </View>
            </View>
          </View>

          <View className='mt-4 rounded-xl bg-white px-4 py-6'>
            <Text className='mb-2 font-app-medium text-body1 text-black'>Instructions</Text>
            <Text className='font-app text-body2 text-black/70'>
              Whenever you buy and purchase, and your order succeeded, you will gain reward points.
            </Text>
            <Text className='mt-2 font-app text-body2 text-black/70'>
              You will gain the whole total of your order as your reward points.
            </Text>
            <Text className='mt-2 font-app text-body2 text-black/70'>
              This is accumulated points mechanism, which means your points still remain after get voucher
            </Text>
          </View>
        </View>
        <View className='h-4' />
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default PointScreen
