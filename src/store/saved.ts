import { immer } from 'zustand/middleware/immer'
import { create } from 'zustand'

export type Saved = {
  id: string
  image: string
  desc: string
  price: number
}

type State = {
  savedList: Saved[]
}

type Action = {
  removeSaved: (id: string) => void
}

const useSavedStore = create(
  immer<State & Action>((set) => ({
    savedList: [
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
    ],
    removeSaved: (id) => {
      set((state) => {
        const savedIndex = state.savedList.findIndex((item) => item.id === id)
        state.savedList.splice(savedIndex, 1)
      })
    }
  }))
)

export default useSavedStore
