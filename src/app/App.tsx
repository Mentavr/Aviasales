import { useEffect } from "react";
import { Header } from "./Header";
import { Main } from "./Main";
import cls from "./style.module.scss";
import { getId } from "@/store/reducers/services/apiTicketsReducer";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import Progress from "./components/Progress/Progress";
import { useAppSelector } from "@/utils/hooks/useAppSelector";
import {
  isStopSelector,
  ticketsSelector,
} from "@/store/reducers/ticketsReducer";

function App() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isStopSelector);
  const isAdd = useAppSelector(ticketsSelector);

  useEffect(() => {
    dispatch(getId());
  }, []);

  return (
    <div className={cls.app}>
      <Progress isLoading={!isLoading} length={isAdd?.length} />
      <Header />
      <Main />
    </div>
  );
}

export default App;
