import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingState } from "../../shared/enum/LoadingState.ts";
import { UserDetail } from "../../domain/User/User.ts";
import { AddBlockedUserAsync } from "./thunks/Add/AddBlockedUserAsync.ts";
import { AddBlockedUserResponse } from "./thunks/Add/AddBlockedUserResponse.ts";
import { RemoveBlockedUserAsync } from "./thunks/Remove/RemoveBlockedUserAsync.ts";
import { RemoveBlockedUserResponse } from "./thunks/Remove/RemoveBlockedUserResponse.ts";
import { GetAllBlockedUsersAsync } from "./thunks/GetAll/GetAllBlockedUsersAsync.ts";
import { GetAllBlockedUserResponse } from "./thunks/GetAll/GetAllBlockedUserResponse.ts";

interface BlockedState {
  loading: LoadingState;
  blocked_list: number[];
  blocked: UserDetail[];
}
const initialState: BlockedState = {
  loading: LoadingState.idle,
  blocked_list: [],
  blocked: [],
}
export const BlockedSlice = createSlice(
  {
    name: 'blocked',
    initialState: initialState,
    reducers: {
      cleanBlocked: (state) => {
        state.loading = LoadingState.idle;
        state.blocked_list = [];
        state.blocked = [];
      },
      AddBlockedUser: (state, {payload}: PayloadAction<UserDetail>) => {
        state.blocked = [
          ...state.blocked,
          payload
        ]
      },
      RemoveBlockedUser: (state, {payload}: PayloadAction<number>) => {
        state.blocked = state.blocked.filter(b => b.user!.id !== payload);
        state.blocked_list = state.blocked_list.filter(b => b!== payload);
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(AddBlockedUserAsync.pending, (state) => {
          state.loading = LoadingState.pending;
        })
        .addCase(AddBlockedUserAsync.fulfilled, (state, {payload}: PayloadAction<AddBlockedUserResponse>) => {
          state.loading = LoadingState.success;
          state.blocked_list = [
            ...state.blocked_list,
            payload.user_id,
          ];
        })
        .addCase(AddBlockedUserAsync.rejected, (state) => {
          state.loading = LoadingState.failed;
        });
      builder
        .addCase(RemoveBlockedUserAsync.pending, (state) => {
          state.loading = LoadingState.pending;
        })
        .addCase(RemoveBlockedUserAsync.fulfilled, (state, {payload}: PayloadAction<RemoveBlockedUserResponse>) => {
          state.loading = LoadingState.success;
          state.blocked_list = state.blocked_list.filter(b => b !== payload.user_id);
          state.blocked = state.blocked.filter(b => b.id !== payload.user_id);
        })
        .addCase(RemoveBlockedUserAsync.rejected, state => {
          state.loading = LoadingState.failed;
        });
      builder
        .addCase(GetAllBlockedUsersAsync.pending, state => {
          state.loading = LoadingState.pending;
        })
        .addCase(GetAllBlockedUsersAsync.fulfilled, (state, {payload}: PayloadAction<GetAllBlockedUserResponse>) => {
          state.loading = LoadingState.success;
          state.blocked_list = payload.blockeds.length > 0 ? payload.blockeds.map(b => b.user?.id!): [];
          state.blocked = payload.blockeds;
        })
    }
  }
)

export const {
  cleanBlocked,
  AddBlockedUser,
  RemoveBlockedUser,
} = BlockedSlice.actions;

export default BlockedSlice.reducer;
