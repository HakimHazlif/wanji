import { createSlice } from "@reduxjs/toolkit";

const listsSlice = createSlice({
  name: "lists",
  initialState: {
    lists: {},
    loading: false,
    error: null,
  },
  reducers: {
    fetchItemsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchItemsSuccess(state, action) {
      const { listId, items, list: listItems } = action.payload;
      console.log({ listId, items, listItems });

      if (!state.lists[listId]) {
        state.lists[listId] = {
          items: [],
          nextStartPoint: 0,
          hasMore: true,
        };
      }

      const list = state.lists[listId];
      list.items.push(...items);
      list.nextStartPoint += items.length;
      list.hasMore = list.items.length < listItems.length;
      console.log(list.hasMore);
      state.loading = false;
      state.error = null;
    },
    fetchItemsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearLists(state) {
      state.lists = {};
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  fetchItemsStart,
  fetchItemsSuccess,
  fetchItemsFailure,
  clearLists,
} = listsSlice.actions;

export default listsSlice.reducer;
