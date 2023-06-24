import { immer } from 'zustand/middleware/immer'
import { create } from 'zustand'
import { BagItemProps } from '~/types/bagItem.type'
import { ConvertedProductDetailProps } from '~/types/product.type'

type State = {
  data?: ConvertedProductDetailProps
}

type Action = {
  setData: (data: ConvertedProductDetailProps | undefined) => void
}

const useProductStore = create(
  immer<State & Action>((set) => ({
    setData: (data) => {
      set((state) => {
        state.data = data
      })
    }
  }))
)

export default useProductStore
