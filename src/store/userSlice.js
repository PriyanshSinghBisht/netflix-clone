import { createSlice } from '@reduxjs/toolkit';

const loadFromStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const initialState = {
  myMovieList: loadFromStorage('myMovieList', []),
  myTvList: loadFromStorage('myTvList', []),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addToMyList: (state, action) => {
      const { item, type } = action.payload;
      if (type === 'movie') {
        if (!state.myMovieList.find((i) => i.id === item.id)) {
          state.myMovieList.push(item);
          localStorage.setItem('myMovieList', JSON.stringify(state.myMovieList));
        }
      } else {
        if (!state.myTvList.find((i) => i.id === item.id)) {
          state.myTvList.push(item);
          localStorage.setItem('myTvList', JSON.stringify(state.myTvList));
        }
      }
    },
    removeFromMyList: (state, action) => {
      const { id, type } = action.payload;
      if (type === 'movie') {
        state.myMovieList = state.myMovieList.filter((item) => item.id !== id);
        localStorage.setItem('myMovieList', JSON.stringify(state.myMovieList));
      } else {
        state.myTvList = state.myTvList.filter((item) => item.id !== id);
        localStorage.setItem('myTvList', JSON.stringify(state.myTvList));
      }
    },
    clearMyList: (state, action) => {
      const { type } = action.payload;
      if (type === 'movie') {
        state.myMovieList = [];
        localStorage.setItem('myMovieList', JSON.stringify([]));
      } else if (type === 'tv') {
        state.myTvList = [];
        localStorage.setItem('myTvList', JSON.stringify([]));
      } else {
        state.myMovieList = [];
        state.myTvList = [];
        localStorage.setItem('myMovieList', JSON.stringify([]));
        localStorage.setItem('myTvList', JSON.stringify([]));
      }
    },
  },
});

export const { addToMyList, removeFromMyList, clearMyList } = userSlice.actions;
export default userSlice.reducer;