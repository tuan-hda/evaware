import { immer } from 'zustand/middleware/immer'
import { create } from 'zustand'
import { AddressProps } from '~/types/address.type'
import { PaymentMethodProps } from '~/types/payment.type'

type State = {
  currentAddress?: AddressProps
  currentPaymentMethod?: PaymentMethodProps
}

type Action = {
  setAddress: (data?: AddressProps) => void
  setPaymentMethod: (data?: PaymentMethodProps) => void
}

const useCartStore = create(
  immer<State & Action>((set) => ({
    setAddress: (data) => {
      set((state) => {
        state.currentAddress = data
      })
    },
    setPaymentMethod: (data) => {
      set((state) => {
        state.currentPaymentMethod = data
      })
    }
  }))
)

export default useCartStore
