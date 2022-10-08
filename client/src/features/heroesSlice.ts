import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getHeroes, getOneHero } from '../api/heroes';
import { RootState } from '../app/store';
import { Hero } from '../types/hero';

export interface InitialState {
  heroes: Hero[],
  heroesLength: number,
  hero: Hero | null,
  status: 'idle' | 'loading' | 'failed',
}

export const initialState: InitialState = {
  heroes: [],
  hero: null,
  heroesLength: 0,
  status: 'idle',
};

export const heroesAsync = createAsyncThunk(
  'users/heroesAsync',
  async (number: number) => {
    const response = await getHeroes(number);

    return response;
  },
);

export const heroAsync = createAsyncThunk(
  'users/heroAsync',
  async (id: string) => {
    const response = await getOneHero(id);

    return response;
  },
);

export const heroesReducer = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    setHero: (
      state,
      { payload }: PayloadAction<Hero>,
    ) => {
      state.hero = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(heroesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(heroesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.heroes = action.payload.rows;
        state.heroesLength = action.payload.count;
      })
      .addCase(heroesAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(heroAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(heroAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.hero = action.payload;
      })
      .addCase(heroAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const hero = (state: RootState) => state.heroes.hero;

export default heroesReducer.reducer;

export const { setHero } = heroesReducer.actions;
