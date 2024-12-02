import { ITickets } from "@/store/reducers/ticketsReducer";

export interface IContextValueType {
  getFilterTickets: () => ITickets[];
  countTickets: number;
  setCountTickets: (e: number) => void;
  visibleTickets: ITickets[];
}
