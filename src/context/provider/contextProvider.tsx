import { ReactNode, useMemo, useState } from "react";
import { IContextValueType } from "../types";
import { StateContext } from "../stateContext";
import { useAppSelector } from "@/utils/hooks/useAppSelector";
import { ITickets, ticketsSelector } from "@/store/reducers/ticketsReducer";
import { filterOptionsSelector } from "@/store/reducers/filterReducer";
import { sortToggleTickets } from "@/utils/helpers/sortToggleTickets";
import { sortOptions } from "@/utils/helpers/sortOptions";

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const tickets = useAppSelector(ticketsSelector);
  const [countTickets, setCountTickets] = useState<number>(5);
  const [visibleTickets, setVisibleTickets] = useState<ITickets[]>(
    [] as ITickets[],
  );

  const { panelOptions, toggleOptions } = useAppSelector(filterOptionsSelector);

  useMemo(() => {
    if (!tickets) return;
    const firstTenTickets = tickets.filter((_, index) => index < countTickets);
    const sort = sortToggleTickets(toggleOptions, firstTenTickets);
    const filterOptions = Object.fromEntries(
      Object.values(panelOptions)
        .filter((option) => option.checked)
        .map((option) => [option.stop, option.stop]),
    );

    setVisibleTickets(sortOptions(filterOptions, sort));
  }, [tickets, countTickets, toggleOptions, panelOptions]);

  const getFilterTickets = () => {
    return visibleTickets;
  };

  const contextValue: IContextValueType = {
    getFilterTickets,
    countTickets,
    setCountTickets,
    visibleTickets,
  };

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};
