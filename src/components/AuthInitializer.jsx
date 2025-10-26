import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getMe } from "../features/authSlice";

export function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  
  return children;
}
