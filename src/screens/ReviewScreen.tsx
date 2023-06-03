import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CustomSafeAreaView, Review, SearchBar } from '~/components/common'
import Bars from '~/components/navigation/Bars'
import { HomeNavigationProp } from '~/components/navigation/HomeNav'
import { useNavigation } from '@react-navigation/native'

const DATA = [
  {
    starNum: 4,
    time: 'Today, 12:30 pm',
    userAvt:
      'https://steamuserimages-a.akamaihd.net/ugc/1782857511239293956/F8D9A28DC154287629BCB9E5F599F4D2BE075D15/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
    userName: 'Gái nhà quê',
    content: 'Dango là nhất',
    imageReview: [
      'https://upload-os-bbs.hoyolab.com/upload/2021/09/22/107564949/4890ea57289a5fc710979c0ab9ab3544_4578436378514736626.png',
      'https://i.ytimg.com/vi/0uGYD1nus7o/maxresdefault.jpg',
      'https://i.ytimg.com/vi/Tw_LKHjKWhE/maxresdefault.jpg'
    ]
  },
  {
    starNum: 4,
    time: '1 month ago',
    userAvt: 'https://i.ytimg.com/vi/0uGYD1nus7o/maxresdefault.jpg',
    userName: 'Erin Mango',
    content: 'Everything is good. Nice quality',
    imageReview: [
      'https://upload-os-bbs.hoyolab.com/upload/2021/09/22/107564949/4890ea57289a5fc710979c0ab9ab3544_4578436378514736626.png'
    ]
  },
  {
    starNum: 5,
    time: '2 month ago',
    userAvt: 'https://i.ytimg.com/vi/0uGYD1nus7o/maxresdefault.jpg',
    userName: 'Paityn Saris',
    content:
      'Bought this table 2 months ago and I wanted to say, this is the best bedside table I’ve ever used 😍Everything',
    imageReview: []
  }
]

const ReviewScreen = () => {
  const navigation = useNavigation<HomeNavigationProp>()
  const [data, setData] = useState(DATA)
  useEffect(() => {
    setData(DATA)
  }, [DATA])

  return (
    <CustomSafeAreaView className='flex-1 px-4'>
      <Bars
        headerLeft='return'
        title='Reviews'
        headerRight='action'
        label='New review'
        onLeftButtonPress={() => navigation.goBack()}
        onRightButtonPress={() => navigation.navigate('NewReview')}
        className='mb-2'
      />
      <SearchBar />
      <FlatList
        className='mt-4'
        data={DATA}
        renderItem={({ item }) => <Review review={item} />}
        showsVerticalScrollIndicator={false}
      />
    </CustomSafeAreaView>
  )
}

export default ReviewScreen
