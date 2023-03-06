import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserResponse, User } from "./user.types";
import { getUser } from "./userAction";

export type UserState = {
  users: Array<User>;
  selectedUser: User | null;
  totalUserNumber: number;
  activePageNumber: number;
  hasError: boolean;
  loading: "idle" | "pending" | "succeeded" | "failed";
};

const initialState: UserState = {
  users: [],
  selectedUser: null,
  totalUserNumber: -1,
  activePageNumber: 1,
  hasError: false,
  loading: "idle",
};

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    selectUser(state, action: PayloadAction<User | null>) {
      state.selectedUser = action.payload;
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
          state.users = payload.results;
          state.totalUserNumber = payload.count;
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
