import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import heroesReducer from '../features/heroesSlice';
import newHeroReducer from '../features/newHeroSlice';

export const store = configureStore({
  reducer: {
    heroes: heroesReducer,
    newHero: newHeroReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
