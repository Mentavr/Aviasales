import clsx from "clsx";
import ToggleGroup from "./components/ToggleGroup/ToggleGroup";
import cls from "./style.module.scss";
import { Aside } from "./components/Aside/Aside";
import { useEffect, useRef } from "react";
import {
  getTickets,
  searchIdSelector,
} from "@/store/reducers/services/apiTicketsReducer";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { useAppSelector } from "@/utils/hooks/useAppSelector";
import { isStopSelector } from "@/store/reducers/ticketsReducer";
import { CardsTickets } from "./components/CardsTickets/CardsTickets";
import { Button } from "./components/Button/Button";
import { useStateContext } from "@/utils/hooks/useStateContext";

export const Main = () => {
  const dispatch = useAppDispatch();
  const searchId = useAppSelector(searchIdSelector);
  const isStop = useAppSelector(isStopSelector);
  const refIdInterval = useRef<number | undefined>(undefined);

  const { countTickets, setCountTickets, visibleTickets } = useStateContext();

  const getTicketsTimeOut = async () => {
    const idTickets = window.setInterval(() => {
      dispatch(getTickets(searchId ?? ""));
    }, 1000);

    refIdInterval.current = idTickets;
  };

  useEffect(() => {
    if (searchId && !isStop) {
      getTicketsTimeOut();
    }

    if (isStop) {
      clearInterval(refIdInterval.current);
    }
  }, [searchId, isStop]);

  const handlerAddTickets = () => {
    const quantity = 5;
    setCountTickets(countTickets + quantity);
  };

  return (
    <section className={cls.main}>
      <div className={clsx(cls.container, cls.main__content)}>
        <Aside />
        <div className={cls.main__contentCards}>
          <ToggleGroup />
          {visibleTickets.length ? (
            <CardsTickets />
          ) : (
            <span className={cls.no_flights}>
              "Рейсов, подходящих под заданные фильтры, не найдено"
            </span>
          )}
          {!!visibleTickets.length && (
            <Button
              text="Показать еще 5 билетов!"
              onClick={handlerAddTickets}
            />
          )}
        </div>
      </div>
    </section>
  );
};
