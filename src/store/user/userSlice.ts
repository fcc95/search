import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserResponse, User } from "./user.types";
import { getUser } from "./userAction";

const numberReg = /\/(\d+)\/$/;

export type UserState = {
  users: Array<User>;
  selectedUser: User | null;
  hasError: boolean;
  loading: "idle" | "pending" | "succeeded" | "failed";
};

const initialState: UserState = {
  users: [],
  selectedUser: null,
  hasError: false,
  loading: "idle",
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    selectUser(state, action: PayloadAction<string>) {
      state.selectedUser =
        state.selectedUser?.id === action.payload
          ? null
          : state.users.find((user) => user.id === action.payload) || null;
    },
    clearSearchResult(state) {
      state.users = [];
      state.selectedUser = null;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = "pending";
        state.selectedUser = null;
      })
      .addCase(
        getUser.fulfilled,
        (state, { payload }: PayloadAction<UserResponse>) => {
          state.users = payload.results.map((user) => ({
            ...user,
            id: String(user.url.match(numberReg)?.[1]),
          }));
          state.loading = "succeeded";
        }
      )
      .addCase(getUser.rejected, (state) => {
        state.loading = "failed";
        state.hasError = true;
      });
  },
});

export default userSlice.reducer;

export const { selectUser, clearSearchResult } = userSlice.actions;
