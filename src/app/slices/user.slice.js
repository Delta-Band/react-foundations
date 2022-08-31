import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { fetchCount } from './counterAPI';

const initialState = {
  name: '',
  pic: '',
  working: false,
  auth: null
};

const setData = createAsyncThunk('user/setData', async payload => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  window.localStorage.setItem('user', JSON.stringify(payload));
  return payload;
});

const auth = createAsyncThunk('user/auth', async () => {
  return window.localStorage.getItem('auth');
});

const login = createAsyncThunk('user/login', async payload => {
  return window.localStorage.setItem('auth', JSON.stringify(payload));
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(setData.pending, state => {
        state.working = 'Saving';
      })
      .addCase(setData.fulfilled, (state, action) => {
        state = Object.assign(state, action.payload, { working: false });
      })
      .addCase(auth.pending, state => {
        state.working = 'Authenticating';
      })
      .addCase(auth.fulfilled, (state, action) => {
        state.auth = action.payload;
        state.working = false;
      })
      .addCase(login.pending, state => {
        state.working = 'Loging in';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.auth = action.payload;
        state.working = false;
      });
  }
});

userSlice.actions.setData = setData;
userSlice.actions.auth = auth;
userSlice.actions.login = login;

export default userSlice;
