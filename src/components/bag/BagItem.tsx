import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import type { BagItemProps } from '~/types/bagItem.type'
import { Stepper } from '../common'
import { Clear } from 'assets/icon'
import classNames from 'classnames'

type Props = BagItemProps & {
  paddingBottom?: number
  disableButton?: boolean
  onRemove?: (id: string) => void
}

const BagItem = ({ id, img, qty: outerQty, price, desc, paddingBottom, disableButton, onRemove }: Props) => {
  const [qty, setQty] = useState(0)

  useEffect(() => {
    setQty(outerQty)
  }, [outerQty])

  return (
    <View className='flex-row' style={{ paddingBottom }}>
      <Image
        source={{
          uri: img
        }}
        className='h-[115] w-[94] rounded-lg'
      />
      <View className={classNames('ml-4 mr-2 flex-1', !disableButton && 'justify-between')}>
        <View>
          <Text className='font-app-medium text-body1 text-black'>${price}</Text>
          <Text className='mt-1 text-body3 text-giratina-500'>{desc}</Text>
        </View>

        {disableButton ? (
          <Text className='mt-1 text-body3 text-black'>Qty: {qty}</Text>
        ) : (
          <Stepper number={qty} setNumber={setQty} />
        )}
      </View>

      {!disableButton && <Clear onPress={() => onRemove && onRemove(id)} fill='#9e9e9e' />}
    </View>
  )
}

export default BagItem
