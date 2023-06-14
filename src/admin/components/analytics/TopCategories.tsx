import { View } from 'react-native'
import React from 'react'
import AnalyticsHeader from './AnalyticsHeader'
import { PieChart } from 'react-native-chart-kit'
import { chartConfig, chartWidth, getChartConfig } from 'config/chart'
import { useQuery } from '@tanstack/react-query'
import { getTopCategoriesService } from '~/services/statistics'
import { useRefetchOnFocus } from '~/hooks/useRefetchOnFocus'

const TopCategories = () => {
  const { data: temp, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: getTopCategoriesService
  })
  const items = temp?.data.data
  useRefetchOnFocus(refetch)
  const sample = [
    {
      name: 'Chair',
      sales: 2000,
      color: '#FFD60A',
      legendFontColor: '#000',
      legendFontFamily: 'Lexend-Light'
    },
    {
      name: 'Sofas',
      sales: 1800,
      color: '#3F51B5',
      legendFontColor: '#000',
      legendFontFamily: 'Lexend-Light'
    },
    {
      name: 'Bed',
      sales: 1000,
      color: '#4CAF50',
      legendFontColor: '#000',
      legendFontFamily: 'Lexend-Light'
    },
    {
      name: 'Other',
      sales: 800,
      color: '#9e9e9e',
      legendFontColor: '#000',
      legendFontFamily: 'Lexend-Light'
    }
  ]
  const data = items?.slice(0, 4).map((item, index) => ({
    name: item.category.name,
    sales: item.qty,
    legendFontFamily: 'Lexend-Light',
    color: sample[index].color,
    legendFontColor: sample[index].legendFontColor
  }))
  // // each value represents a goal ring in Progress chart

  return (
    <View>
      <AnalyticsHeader title='top categories' changeTime={() => {}} />
      {data && (
        <PieChart
          data={data}
          width={chartWidth}
          height={220}
          chartConfig={getChartConfig('#fff')}
          accessor={'sales'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
        />
      )}
    </View>
  )
}

export default TopCategories
