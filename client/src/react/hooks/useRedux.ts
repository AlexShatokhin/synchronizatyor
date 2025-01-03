import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

export const useTypedDispatch = useDispatch.withTypes<AppDispatch>();
export const useTypedSelector = useSelector.withTypes<RootState>();