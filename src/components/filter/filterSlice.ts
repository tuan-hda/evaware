import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
      ]
}

export const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers:{
        updateFilter: (state, action)=>{
            console.log('check1')
            const prevState = state.filterList
            const {name, selecteds} = action.payload

            const item = prevState.find((item) => item.filterName === name)
            if (item) {
                console.log('check2')
              const filterItem = { filterName: name, optionsSelected: selecteds }
              state.filterList[prevState.indexOf(item)] = filterItem
            }
        },
    }
})

export const {updateFilter} = filterSlice.actions
export default filterSlice.reducer

export type FilterOption = {
    name: string
    selected: boolean
  }
  
  export type Filter = {
    filterName: string
    optionsSelected: FilterOption[]
  }
  
  export type FilterState = {
    filterList: Filter[]
  }
  export type RootState = {
    filter: FilterState
  }