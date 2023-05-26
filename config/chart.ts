import { Dimensions } from 'react-native'
import { ChartConfig } from 'react-native-chart-kit/dist/HelperTypes'

export const chartConfig: ChartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#000',
  backgroundGradientTo: '#000',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726'
  },
  propsForLabels: {
    fontFamily: 'roboto-regular'
  }
}

export const getChartConfig: (bg: string) => ChartConfig = (bg) => ({
  backgroundColor: bg,
  backgroundGradientFrom: bg,
  backgroundGradientTo: bg,
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
  labelColor: () => '#000',
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726'
  }
})

export const chartWidth = Dimensions.get('window').width - 32
