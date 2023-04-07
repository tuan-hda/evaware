import classNames from 'classnames'
import { Pressable, PressableProps, Text, Animated } from 'react-native'
import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

interface Props extends PressableProps {
  type?: 'primary' | 'outline'
  size?: 'large' | 'small'
  label: string
  hasBagIcon?: boolean
  disabled?: boolean
}

const animated = new Animated.Value(0)
const opacityAnimated = new Animated.Value(1)

const Button = ({ type = 'primary', disabled = false, hasBagIcon = false, size = 'large', label, ...props }: Props) => {
  const backgroundColor = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FEE440', '#CBB633']
  })

  const animStart = () => {
    if (disabled) {
      return
    }

    if (type === 'outline') {
      Animated.timing(opacityAnimated, {
        toValue: 0.5,
        duration: 100,
        useNativeDriver: false
      }).start()
      return
    }

    Animated.timing(animated, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false
    }).start()
  }

  const animEnd = () => {
    if (disabled) {
      return
    }

    if (type === 'outline') {
      Animated.timing(opacityAnimated, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false
      }).start()
      return
    }

    Animated.timing(animated, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false
    }).start()
  }

  const getBackgroundColor = () => {
    if (type === 'outline') {
      return 'transparent'
    }
    if (disabled) {
      return '#e0e0e0'
    }
    return backgroundColor
  }

  return (
    <Animated.View
      className={classNames('flex-row rounded-lg')}
      style={{ backgroundColor: getBackgroundColor(), opacity: opacityAnimated }}
    >
      <Pressable
        {...props}
        onPress={!disabled ? props.onPress : null}
        onPressIn={animStart}
        onPressOut={animEnd}
        className={classNames(
          'flex-row items-center justify-center rounded-lg px-4',
          {
            'h-16 flex-1': size === 'large',
            'h-9': size === 'small'
          },
          {
            'border-2': type === 'outline' && size === 'large',
            border: type === 'outline' && size === 'small',
            'border-giratina-500': type === 'outline' && disabled
          }
        )}
      >
        <Text
          className={classNames(
            'font-app-medium',
            {
              'text-body1': size === 'large',
              'text-body2': size === 'small'
            },
            {
              'text-black': !disabled,
              'text-giratina-500': disabled
            }
          )}
        >
          {label}
        </Text>
        {hasBagIcon && (
          <BagSvg
            width={size === 'large' ? 24 : 18}
            height={size === 'large' ? 24 : 18}
            className={classNames({
              'ml-2': size === 'large',
              'ml-1': size === 'small'
            })}
          />
        )}
      </Pressable>
    </Animated.View>
  )
}

function BagSvg(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox='0 0 24 24' fill='none' {...props}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 2a4 4 0 00-4 4v1H7a3 3 0 00-3 3v9a3 3 0 003 3h10a3 3 0 003-3v-9a3 3 0 00-3-3h-1V6a4 4 0 00-4-4zm2 7v2h2V9h1a1 1 0 011 1v9a1 1 0 01-1 1H7a1 1 0 01-1-1v-9a1 1 0 011-1h1v2h2V9h4zm0-2V6a2 2 0 10-4 0v1h4z'
        fill='#212121'
      />
    </Svg>
  )
}

export default Button
