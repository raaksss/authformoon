import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearAuth } from "@/redux/auth/auth.slice";
import { RootState } from "@/redux/store";
import axiosInstance from "@/lib/axiosInstance";

const useAuthSession = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  //  implement the logic here to check user session
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axiosInstance.get('/check-session');
        dispatch(setUser(response.data.user));
      } catch (error) {
        dispatch(clearAuth());
      }
    };

    checkSession();
  }, [dispatch]);
  return user;
};

export default useAuthSession;
