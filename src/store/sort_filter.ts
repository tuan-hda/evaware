import { create, createStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export type FilterOption = {
  name: string
  selected: boolean
}

export type Filter = {
  filterName: string
  optionsSelected: FilterOption[]
}

export type Sort = {
  name: string
  selected: boolean
}

type State = {
  filterList: Filter[]
  minPrice: number
  maxPrice: number
  sortList: Sort[]
}

type Action = {
  updateFilter: (filter: Filter) => void
  updateSort: (sortName: string) => void
  filterClear: () => void
  filterOptionClear: (name: string) => void
  updateMin: (min: number) => void
  updateMax: (max: number) => void
}

const useSortFilterStore = create(
  immer<State & Action>((set) => ({
    filterList: [
      {
        filterName: 'Category',
        optionsSelected: [
          {
            name: 'Furniture',
            selected: true
          },
          {
            name: 'Lighting',
            selected: false
          },
          {
            name: 'Rugs',
            selected: true
          },
          {
            name: 'Mirrors',
            selected: false
          },
          {
            name: 'Blankets',
            selected: true
          }
        ]
      },
      {
        filterName: 'Product type',
        optionsSelected: [
          {
            name: 'Furniture',
            selected: true
          },
          {
            name: 'Lighting',
            selected: false
          }
        ]
      },
      {
        filterName: 'Color',
        optionsSelected: []
      },
      {
        filterName: 'Size',
        optionsSelected: []
      },
      {
        filterName: 'Quality',
        optionsSelected: []
      }
    ],
    sortList: [
      {
        name: 'New first',
        selected: false
      },
      {
        name: 'Price: high to low',
        selected: true
      },
      {
        name: 'Price: low to high',
        selected: false
      },
      {
        name: 'Popular first',
        selected: false
      }
    ],
    minPrice: 0,
    maxPrice: 700,
    updateFilter: (filter) => {
      set((state) => {
        const filterIndex = state.filterList.findIndex((item) => item.filterName === filter.filterName)
        if (filterIndex !== -1) {
          state.filterList[filterIndex].optionsSelected = filter.optionsSelected
        }
      })
    },
    updateSort: (sortName) => {
      set((state) => {
        const sortIndex = state.sortList.findIndex((item) => item.name === sortName)
        if (sortIndex !== -1) {
          const prevSelected = state.sortList[sortIndex].selected
          state.sortList[sortIndex].selected = !prevSelected
        }
      })
    },
    filterClear() {
      set((state) => {
        state.filterList.forEach((filter) => {
          filter.optionsSelected.forEach((option) => {
            option.selected = false
          })
        })
      })
    },
    filterOptionClear(name) {
      set((state) => {
        const filterIndex = state.filterList.findIndex((item) => item.filterName === name)
        if (filterIndex !== -1) {
          state.filterList[filterIndex].optionsSelected.forEach((option) => {
            option.selected = false
          })
        }
      })
    },
    updateMin(min) {
      set((state) => {
        state.minPrice = min
      })
    },
    updateMax(max) {
      set((state) => {
        state.maxPrice = max
      })
    }
  }))
)

export default useSortFilterStore
