import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "@/contexts/AuthContext";
import type { RootState } from "./store";

export type StoreKey =
  | "USER"
  | "USER_REFRESH"
  | "POINT"
  | "POINT_REFRESH";

interface AppState {
  user: UserProfile | null;
  userRefresh: number;
  point: number;
  pointRefresh: number;
}

const initialState: AppState = {
  user: null,
  userRefresh: 0,
  point: 0,
  pointRefresh: 0,
};

type StorePayload =
  | { key: "USER"; value: UserProfile | null }
  | { key: "USER_REFRESH"; value: number }
  | { key: "POINT"; value: number }
  | { key: "POINT_REFRESH"; value: number };

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<StorePayload>) => {
      const { key, value } = action.payload;

      switch (key) {
        case "USER":
          state.user = value;
          break;
        case "USER_REFRESH":
          state.userRefresh = value;
          break;
        case "POINT":
          state.point = value;
          break;
        case "POINT_REFRESH":
          state.pointRefresh = value;
          break;
      }
    },
    resetStore: () => initialState,
  },
});

export const { setData, resetStore } = appSlice.actions;
export default appSlice.reducer;

// Selectors (camelCase access)
export const selectUser = (state: RootState) => state.app.user;
export const selectUserRefresh = (state: RootState) => state.app.userRefresh;
export const selectPoint = (state: RootState) => state.app.point;
export const selectPointRefresh = (state: RootState) => state.app.pointRefresh;

