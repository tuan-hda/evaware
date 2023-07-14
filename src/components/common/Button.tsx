import classNames from 'classnames'
import { useEffect, useMemo } from 'react'
import { Pressable, PressableProps, Text, View, Animated, Easing } from 'react-native'
import Svg, { Path, SvgProps } from 'react-native-svg'
import AntDesign from 'react-native-vector-icons/AntDesign'

interface Props extends PressableProps {
  type?: 'primary' | 'outline' | 'secondary' | 'text'
  size?: 'large' | 'small'
  label: string
  hasBagIcon?: boolean
  disabled?: boolean
  loading?: boolean
  isDanger?: boolean
}

const Button = ({
  type = 'primary',
  disabled = false,
  hasBagIcon = false,
  size = 'large',
  label,
  loading,
  className,
  isDanger = false,
  ...props
}: Props) => {
  const animated = new Animated.Value(0)
  const opacityAnimated = new Animated.Value(1)
  const spinAnimated = useMemo(() => new Animated.Value(0), [])

  const getStartColor = () => {
    if (type === 'primary') return '#FEE440'
    if (type === 'text') return '#F44336'
    return '#f5f5f5'
  }

  const getEndColor = () => {
    if (type === 'primary') return '#CBB633'
    if (type === 'text') return '#9F0704'
    return '#9e9e9e'
  }

  const backgroundColor = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [getStartColor(), getEndColor()]
  })
  const spin = spinAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  const animStart = () => {
    if (disabled || loading || type === 'secondary') {
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
    let flag = true

    if (disabled || loading) {
      flag = false
    }

    if (flag && type === 'outline') {
      Animated.timing(opacityAnimated, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false
      }).start()
      flag = false
    }

    if (flag) {
      Animated.timing(animated, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false
      }).start()
    }

    // if (!disabled) {
    //   setTimeout(() => props.onPress && props.onPress(e), 100)
    // }
  }

  const getBackgroundColor = () => {
    if (type === 'outline' || type === 'text') {
      return 'transparent'
    }
    if (disabled) {
      return '#e0e0e0'
    }
    return backgroundColor
  }

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.timing(spinAnimated, {
          toValue: 1,
          useNativeDriver: true,
          duration: 2000,
          easing: Easing.linear
        })
      ).start()
    }
  }, [loading, spinAnimated])

  return (
    <Animated.View
      className={classNames('flex-row rounded-lg')}
      style={{ backgroundColor: getBackgroundColor(), opacity: opacityAnimated }}
    >
      <Pressable
        onPress={props.onPress}
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
            'border-giratina-500': type === 'outline' && disabled && !isDanger,
            'border-magikarp-400': type === 'outline' && disabled && isDanger
          },
          className
        )}
      >
        {!loading && (
          <View>
            {type === 'text' && isDanger && !disabled ? (
              <Animated.Text className='font-app-medium text-body1' style={{ color: backgroundColor }}>
                {label}
              </Animated.Text>
            ) : (
              <Text
                className={classNames(
                  'font-app-medium',
                  {
                    'text-body1': size === 'large',
                    'text-body2': size === 'small'
                  },
                  {
                    'text-black': !disabled && !isDanger,
                    'text-giratina-500': disabled,
                    'text-magikarp-400': isDanger
                  }
                )}
              >
                {label}
              </Text>
            )}
          </View>
        )}

        {hasBagIcon && !loading && (
          <BagSvg
            width={size === 'large' ? 24 : 18}
            height={size === 'large' ? 24 : 18}
            className={classNames({
              'ml-2': size === 'large',
              'ml-1': size === 'small'
            })}
          />
        )}

        {loading && (
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <AntDesign name='loading1' size={20} />
          </Animated.View>
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
