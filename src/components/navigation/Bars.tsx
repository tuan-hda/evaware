import { View, Text, Pressable } from 'react-native'
import React, { ReactElement } from 'react'
import { ArrowLeft, Close, Heart, Setting } from 'assets/icon'
import { Button } from '../common'
import classNames from 'classnames'

interface Props {
  headerLeft?: string
  title?: string
  subTitle?: string
  headerRight?: string
  backgroundColor?: string
  label?: string
  onLeftButtonPress?: () => void
  onRightButtonPress?: () => void
  titleUnder?: boolean
  style?: {}
}

const LEFT = ['none', 'return', 'close']
const RIGHT = ['none', 'button', 'action', 'heart', 'setting']

const Bars = ({
  headerLeft = 'none',
  title,
  subTitle,
  headerRight = 'none',
  backgroundColor = '#ffffff',
  label = '',
  onLeftButtonPress = () => console.log('Return!'),
  onRightButtonPress = () => console.log('Right button pressed!'),
  titleUnder = false,
  style
}: Props) => {
  const checkHeaderLeft = LEFT.includes(headerLeft) ? headerLeft : LEFT[0]
  const checkHeaderRight = RIGHT.includes(headerRight) ? headerRight : LEFT[0]
  const checkLabel = label === '' ? (headerRight === 'button' ? 'Button' : 'Action') : label

  return (
    <View className='w-full' style={style}>
      <View className='mt-6 h-14 flex-row items-center p-4' style={{ backgroundColor }}>
        {/* Left */}
        <View className='flex-1'>
          <Pressable
            className={classNames('h-9 w-6 items-center justify-center rounded-full', {
              'w-9 bg-white': backgroundColor === 'transparent'
            })}
            onPress={onLeftButtonPress}
          >
            {checkHeaderLeft === 'return' && <ArrowLeft />}
            {checkHeaderLeft === 'close' && <Close />}
          </Pressable>
        </View>
        {/* Middle */}
        {!titleUnder && (
          <View className='items-center'>
            {title && <Text className='font-app-medium text-body1'>{title}</Text>}
            {subTitle && <Text className='font-app-medium text-body3 text-giratina-500'>{subTitle}</Text>}
          </View>
        )}
        {/* Right  */}
        <View className='flex-1 items-end '>
          {/* Heart */}
          {checkHeaderRight === 'heart' && (
            <Pressable
              className={classNames('h-9 w-6 items-center justify-center rounded-full', {
                'w-9 bg-white': backgroundColor === 'transparent'
              })}
              onPress={onRightButtonPress}
            >
              <Heart height={24} width={24} />
            </Pressable>
          )}

          {/* Button */}
          {checkHeaderRight === 'button' && <Button label={checkLabel} size='small' onPress={onRightButtonPress} />}

          {/* Action */}
          {checkHeaderRight === 'action' && (
            <Pressable
              className={classNames('h-9 items-center justify-center rounded-[4px]', {
                'bg-white px-4': backgroundColor === 'transparent'
              })}
              onPress={onRightButtonPress}
            >
              <Text
                className={classNames('font-app-medium text-body2', {
                  'text-body1': backgroundColor !== 'transparent'
                })}
              >
                {checkLabel}
              </Text>
            </Pressable>
          )}

          {/* Setting */}
          {checkHeaderRight === 'setting' && (
            <Pressable
              className={classNames('h-9 w-6 items-center justify-center rounded-full', {
                'w-9 bg-white': backgroundColor === 'transparent'
              })}
              onPress={onRightButtonPress}
            >
              <Setting height={24} width={24} />
            </Pressable>
          )}
        </View>
      </View>
      {titleUnder && (
        <View className='items-start px-4 pb-4'>
          {title && <Text className='font-app-semibold text-heading1'>{title}</Text>}
          {subTitle && <Text className='mt-1 font-app-regular text-body1 text-giratina-500'>{subTitle}</Text>}
        </View>
      )}
    </View>
  )
}

export default Bars
