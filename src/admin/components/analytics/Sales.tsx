import { View, Text, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LineChart } from 'react-native-chart-kit'
import { chartConfig } from 'config/chart'
import AnalyticsHeader from './AnalyticsHeader'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useQuery } from '@tanstack/react-query'
import { getSalesService } from '~/services/statistics'
import moment from 'moment'
import { useRefetchOnFocus } from '~/hooks/useRefetchOnFocus'

type Props = {
  time: string
  changeTime: () => void
}

const cons = new Date()

const Sales = ({ time, changeTime }: Props) => {
  const [date, setDate] = useState(new Date(cons.getTime()))
  const [dateEnd, setDateEnd] = useState(new Date())
  const [type, setType] = useState<'start' | 'end'>('start')
  const [show, setShow] = useState(false)
  const [init, setInit] = useState(true)
  const { data, refetch } = useQuery({
    queryKey: ['top-sales', date, dateEnd],
    queryFn: () => {
      const start = moment.utc(date.toLocaleDateString(), 'MM/DD/YY').format('YYYY-MM-DD')
      const end = moment.utc(dateEnd.toLocaleDateString(), 'MM/DD/YY').format('YYYY-MM-DD')
      if (start === end) return
      return getSalesService(start, end)
    }
  })
  useRefetchOnFocus(refetch)

  useEffect(() => {
    if (init) {
      date.setMonth(date.getMonth() - 5)
      setInit(false)
    }
  }, [date, init])

  const toggle = () => {
    setShow((prev) => !prev)
    setType('start')
  }

  const toggleEnd = () => {
    setShow((prev) => !prev)
    setType('end')
  }

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate
    setShow(false)
    if (type === 'start') {
      setDate(currentDate)
    } else {
      setDateEnd(currentDate)
    }
  }

  return (
    <View>
      <AnalyticsHeader
        title='sales'
        time={date.toLocaleDateString()}
        time1={dateEnd.toLocaleDateString()}
        changeTime={toggle}
        changeTime1={toggleEnd}
      />
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={type === 'start' ? date : dateEnd}
          mode={'date'}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <View className='mt-1 flex-row justify-between rounded-lg bg-giratina-100 p-2'>
        <Text className='font-app text-sm text-black'>Total sale</Text>
        <Text className='font-app-regular text-sm text-black'>${data?.data.total}</Text>
      </View>
      <View className='mt-1 flex-row justify-between rounded-lg p-2'>
        <Text className='font-app text-sm text-black'>Growth</Text>
        <Text className='font-app-regular text-sm text-gengar-400'>+{data?.data.growth}%</Text>
      </View>
      {data?.data?.total && (
        <LineChart
          data={{
            labels: Object.keys(data?.data.monthly_totals || []),
            datasets: [
              {
                data: Object.values(data?.data.monthly_totals || [])
              }
            ]
          }}
          width={Dimensions.get('window').width - 32} // from react-native
          height={220}
          yAxisLabel='$'
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={chartConfig}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      )}
    </View>
  )
}

export default Sales
