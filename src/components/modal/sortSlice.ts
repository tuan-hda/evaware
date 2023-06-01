import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sortList: [
      {
        name: 'Price: high to low',
        selected: true
      },
      {
        name: 'Price: low to high',
        selected: false
      },
      {
        name: 'New first',
        selected: false
      },
      {
        name: 'Popular first',
        selected: false
      }
    ]
}

export const sortSlice = createSlice({
    name:'sort',
    initialState,
    reducers:{
        updateSort: (state, action)=>{
            const prevState = state.sortList
            const name = action.payload

            const item = prevState.find((item) => item.name === name)
            if (item) {
              const sortItem = { name: name, selected: !item.selected }
              state.sortList[prevState.indexOf(item)] = sortItem
            }
        },
    }
})

export const {updateSort} = sortSlice.actions
export default sortSlice.reducer
  
  export type Sort = {
    name: string
    selected: boolean
  }
  
  export type SortState = {
    sortList: Sort[]
  }
  export type RootState = {
    sort: SortState
  }