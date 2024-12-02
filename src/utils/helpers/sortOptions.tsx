import { ITickets } from "@/store/reducers/ticketsReducer";
import { IItem } from "../constants/filterOptions";

export const sortOptions = (option: IItem, tickets: ITickets[]) => {
  if (Object.values(option).includes("all")) return tickets;
  return tickets.filter((ticket) => {
    const stopsTo = ticket.segments[0].stops.length;
    const stopsBack = ticket.segments[1].stops.length;

    return (
      Object.values(option).includes(stopsTo) ||
      Object.values(option).includes(stopsBack)
    );
  });
};
