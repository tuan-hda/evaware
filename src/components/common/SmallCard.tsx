import { Clear } from 'assets/icon'
import classNames from 'classnames'
import { Image, Pressable } from 'react-native'
import { View, Text } from 'react-native'
import Button from './Button'

interface Props {
  price: number
  desc: string
  image: string
  style?: string
  qty?: number
  containerClassName?: string
  onPress?: () => void
  onButtonClearPress?: () => void
  moveToBag?: () => void
  variation?: string
  noOrderAgain?: boolean
}

const styles = ['order', 'saved']

const SmallCard = ({
  price,
  variation,
  moveToBag,
  desc,
  image,
  style = 'order',
  containerClassName,
  onPress,
  onButtonClearPress,
  ...props
}: Props) => {
  const checkedStyle = styles.includes(style) ? style : styles[0]
  const buttonLabel = checkedStyle === 'order' ? 'Order again' : 'Move to bag'

  return (
    <Pressable className={classNames('w-full flex-row', containerClassName)} onPress={onPress}>
      <Image style={{ width: 94, height: 115 }} className='mr-4 rounded-lg' source={{ uri: image }} />
      <View className='flex-1'>
        <View className='flex-1 flex-row'>
          <View className='mr-2 flex-1'>
            <Text className='mb-1 font-app-medium text-body1'>${price}</Text>
            <Text className='w-full font-app-light text-body3 text-giratina-500' numberOfLines={1}>
              {desc}
            </Text>
            {variation && (
              <Text className='mt-1 w-full font-app-light text-body3 text-giratina-500' numberOfLines={2}>
                Variation: {variation}
              </Text>
            )}
            <Text className='mb-2 mt-1 font-app text-body3 text-giratina-500'>Qty: {props.qty}</Text>
          </View>
          {checkedStyle === 'saved' && (
            <Pressable onPress={onButtonClearPress}>
              <Clear fill={'#9e9e9e'} />
            </Pressable>
          )}
        </View>

        <View className='flex-row'>
          {!props.noOrderAgain && <Button size='small' onPress={moveToBag} label={buttonLabel} />}
          <View className='flex-1' />
        </View>
      </View>
    </Pressable>
  )
}

export default SmallCard
