import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  createHero,
  deleteHero,
  updateHero,
} from '../api/heroes';

export interface NewHero {
  nickname: string,
  realName: string,
  originDescription: string,
  superpowers: string,
  catchPhrase: string,
}

export interface NewHeroError {
  nickname: boolean,
  realName: boolean,
  originDescription: boolean,
  superpowers: boolean,
  catchPhrase: boolean,
  images: boolean,
}

export interface InitialState {
  newHero: NewHero,
  newHeroError: NewHeroError,
  formVisible: boolean,
  submit: boolean,
  status: 'idle' | 'loading' | 'failed',
}

export const initialState: InitialState = {
  newHero: {
    nickname: '',
    realName: '',
    originDescription: '',
    superpowers: '',
    catchPhrase: '',
  },
  newHeroError: {
    nickname: false,
    realName: false,
    originDescription: false,
    superpowers: false,
    catchPhrase: false,
    images: false,
  },
  formVisible: false,
  submit: false,
  status: 'idle',
};

type PayloadKey = 'nickname' | 'realName' | 'originDescription' | 'superpowers' | 'catchPhrase';

type Data = {
  id: string,
  data: FormData
};

export const createHeroAsync = createAsyncThunk(
  'heroes/createHeroAsync', createHero,
);

export const deleteHeroAsync = createAsyncThunk(
  'heroes/deleteHeroAsync', deleteHero,
);

export const updateHeroAsync = createAsyncThunk(
  'heroes/updateHeroAsync',
  async (arg: Data) => {
    const { id, data } = arg;
    const response = await updateHero(id, data);

    return response;
  },
);

export const newHeroReducer = createSlice({
  name: 'newHero',
  initialState,
  reducers: {
    setFormVisible: (state, action: PayloadAction<boolean>) => {
      state.formVisible = action.payload;
    },
    setSubmit: (state) => {
      state.submit = !state.submit;
    },
    setNewHeroField: (
      state,
      { payload }: PayloadAction<{
        key: PayloadKey,
        value: string,
      }>,
    ) => {
      state.newHero[payload.key] = payload.value;
    },
    setNewHero: (
      state,
      { payload }: PayloadAction<NewHero>,
    ) => {
      state.newHero = payload;
    },
    setNewHeroError: (
      state,
      { payload }: PayloadAction<NewHeroError>,
    ) => {
      state.newHeroError = { ...payload };
    },
    clearNewComment: (state) => {
      state.newHero = initialState.newHero;
    },
  },
});

export default newHeroReducer.reducer;

export const {
  setFormVisible, setNewHeroError, setNewHeroField, clearNewComment, setSubmit, setNewHero,
} = newHeroReducer.actions;
