import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectUserRefresh,
  selectPointRefresh,
  setData,
} from "@/store/slice";
import { generalGetFunction } from "@/utils/commonApiCallFun";
import type { UserProfile } from "@/contexts/AuthContext";

// TODO: Update these endpoints to match your backend routes
const USER_PROFILE_ENDPOINT = "/user/profile";
const USER_POINTS_ENDPOINT = "/user/points";

/**
 * Global side effects:
 * - When userRefresh changes, call user API and store result in `user`
 * - When pointRefresh changes, call points API and store result in `point`
 */
export const GlobalCalls = () => {
  const dispatch = useAppDispatch();
  const userRefresh = useAppSelector(selectUserRefresh);
  const pointRefresh = useAppSelector(selectPointRefresh);

  // Fetch user whenever userRefresh changes (and is > 0)
  useEffect(() => {
    if (!userRefresh) return;

    let cancelled = false;

    (async () => {
      try {
        const response = await generalGetFunction<UserProfile>(
          USER_PROFILE_ENDPOINT,
        );
        if (cancelled) return;

        dispatch(
          setData({
            key: "USER",
            value: response.data,
          }),
        );
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [userRefresh, dispatch]);

  // Fetch points whenever pointRefresh changes (and is > 0)
  useEffect(() => {
    if (!pointRefresh) return;

    let cancelled = false;

    (async () => {
      try {
        const response = await generalGetFunction<number>(
          USER_POINTS_ENDPOINT,
        );
        if (cancelled) return;

        dispatch(
          setData({
            key: "POINT",
            value: response.data,
          }),
        );
      } catch (error) {
        console.error("Failed to fetch user points", error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pointRefresh, dispatch]);

  return null;
};


