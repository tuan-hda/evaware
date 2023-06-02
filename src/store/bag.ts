import { immer } from 'zustand/middleware/immer'
import { create } from 'zustand'
import { BagItemProps } from '~/types/bagItem.type'

type State = {
  bagList: BagItemProps[]
}

type Action = {
  removeBag: (id: string) => void
}

const useBagStore = create(
  immer<State & Action>((set) => ({
    bagList: [
      {
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        price: 150,
        desc: 'Wooden bedside table featuring a raised design',
        img: 'https://www.ikea.com/images/storage-and-organisation-1c37e9ac223e6a594db850986fdf93b2.png?f=s',
        qty: 3,
        variation: 'Long blue'
      },
      {
        id: '1aaaa',
        createdAt: new Date(),
        updatedAt: new Date(),
        price: 150,
        desc: 'Wooden bedside table featuring a raised design',
        img: 'https://www.ikea.com/images/storage-and-organisation-1c37e9ac223e6a594db850986fdf93b2.png?f=s',
        qty: 3,
        variation: 'Long blue'
      },
      {
        id: '1ddeee',
        createdAt: new Date(),
        updatedAt: new Date(),
        price: 150,
        desc: 'Wooden bedside table featuring a raised design',
        img: 'https://www.ikea.com/images/storage-and-organisation-1c37e9ac223e6a594db850986fdf93b2.png?f=s',
        qty: 3,
        variation: 'Long blue'
      },
      {
        id: '1af',
        createdAt: new Date(),
        updatedAt: new Date(),
        price: 150,
        desc: 'Wooden bedside table featuring a raised design',
        img: 'https://www.ikea.com/images/storage-and-organisation-1c37e9ac223e6a594db850986fdf93b2.png?f=s',
        qty: 3,
        variation: 'Long blue'
      },
      {
        id: 'av1',
        createdAt: new Date(),
        updatedAt: new Date(),
        price: 150,
        desc: 'Wooden bedside table featuring a raised design',
        img: 'https://www.ikea.com/images/storage-and-organisation-1c37e9ac223e6a594db850986fdf93b2.png?f=s',
        qty: 3,
        variation: 'Long blue'
      }
    ],
    removeBag: (id) => {
      set((state) => {
        const bagIndex = state.bagList.findIndex((item) => item.id === id)
        state.bagList.splice(bagIndex, 1)
      })
    }
  }))
)

export default useBagStore
