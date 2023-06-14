import { create, createStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { FilterListProps } from '~/components/filter/Filter'
import { ConvertedProductProps } from '~/types/product.type'
import { ListProps } from '~/types/service.type'

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
  filteredProducts?: ListProps<ConvertedProductProps>
  filterQuery?: string
  filterList: Filter[]
  minPrice?: number
  maxPrice?: number
  sort?: string
  sortList: Sort[]
  filterData?: FilterListProps[]
  min_price: number
  max_price: number
}

type Action = {
  setFilteredProducts: (data: ListProps<ConvertedProductProps>) => void
  setSort: (sort: string) => void
  updateFilter: (filter: Filter) => void
  updateSort: (sortName: string) => void
  filterClear: () => void
  filterOptionClear: (name: string) => void
  updateMin: (min: number) => void
  updateMax: (max: number) => void
  setFilterData: (data: FilterListProps[]) => void
  toggleFilter: (index: number, index2: number) => void
  setMinPrice: (value: number) => void
  setMaxPrice: (value: number) => void
}

const useSortFilterStore = create(
  immer<State & Action>((set) => ({
    setFilteredProducts: (data) => {
      set((state) => {
        state.filteredProducts = data
      })
    },
    setSort: (sort) => {
      set((state) => {
        state.sort = sort
      })
    },
    min_price: 0,
    max_price: 0,
    setMinPrice: (value: number) => {
      set((state) => {
        state.min_price = value
      })
    },
    setMaxPrice: (value: number) => {
      set((state) => {
        state.max_price = value
      })
    },
    toggleFilter: (index, index2) => {
      set((state) => {
        const value = state.filterData && state.filterData[index]
        if (value) {
          value.selected[index2].selected = !value.selected[index2].selected
        }
      })
    },
    setFilterData: (data) => {
      set((state) => {
        state.filterData = data
      })
    },
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
        // state.filterList.forEach((filter) => {
        //   filter.optionsSelected.forEach((option) => {
        //     option.selected = false
        //   })
        // })
        state.minPrice = state.min_price
        state.maxPrice = state.max_price
        state.filterData?.forEach((item) => {
          item?.selected.forEach((x) => {
            x.selected = false
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
