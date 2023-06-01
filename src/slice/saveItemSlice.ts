import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  savedItemList: [
    {
      id: 'id1',
      image: 'https://noithatluongson.vn/wp-content/uploads/2021/07/furniture2-scaled.jpg',
      desc: 'Wooden bedside table featuring a raised design',
      price: 150.0
    },
    {
      id: 'id2',
      image: 'https://www.next.co.uk/nxtcms/resource/blob/5489338/758225c48c0db35da723075526be2aa2/chair-data.jpg',
      desc: 'Wooden bedside table featuring a raised design',
      price: 150.0
    },
    {
      id: 'id3',
      image: 'https://www.next.co.uk/nxtcms/resource/blob/5489338/758225c48c0db35da723075526be2aa2/chair-data.jpg',
      desc: 'Wooden bedside table featuring a raised design',
      price: 150.0
    },
    {
      id: 'id4',
      image: 'https://www.next.co.uk/nxtcms/resource/blob/5489338/758225c48c0db35da723075526be2aa2/chair-data.jpg',
      desc: 'Wooden bedside table featuring a raised design',
      price: 150.0
    },
    {
      id: 'id5',
      image: 'https://www.next.co.uk/nxtcms/resource/blob/5489338/758225c48c0db35da723075526be2aa2/chair-data.jpg',
      desc: 'Wooden bedside table featuring a raised design',
      price: 150.0
    },
    {
      id: 'id6',
      image:
        'https://cdn11.bigcommerce.com/s-1u1m3wn/stencil/f0d917b0-a9ca-013a-dc54-429aee3ea0c9/e/72f7f5d0-cf5a-013b-0a19-26ac30a24330/img/custom_img/furniture_type_01.jpg',
      desc: 'Wooden bedside table featuring a raised design',
      price: 150.0
    }
  ]
}

export const savedItemSlice = createSlice({
  name: 'savedItem',
  initialState,
  reducers: {
    removeItem: (state, action) => {
      const prevState = state.savedItemList
      const id = action.payload
      // console.log(JSON.stringify(prevState, null,2))
      state.savedItemList = prevState.filter(item=>item.id != id)
    }
  }
})

export const { removeItem } = savedItemSlice.actions
export default savedItemSlice.reducer

export type SavedItem = {
    id: string;
    image: string;
    desc: string;
    price: number;
}

export type SavedState = {
  savedItemList: SavedItem[]
}
export type RootState = {
  savedItem: SavedState
}
