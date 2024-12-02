import { ITickets } from "@/store/reducers/ticketsReducer";

interface IFilterFunction {
  (tickets: ITickets[]): ITickets[];
}

interface IOptions {
  cheap: IFilterFunction;
  fast: IFilterFunction;
  optimal: IFilterFunction;
}

const cheap: IFilterFunction = (tickets) => {
  return tickets.sort((a, b) => a.price - b.price);
};

const fast: IFilterFunction = (tickets) => {
  return tickets.sort((a, b) => {
    const sumTimeThere = a.segments[0].duration + a.segments[1].duration;
    const sumTimeBack = b.segments[0].duration + b.segments[1].duration;
    return sumTimeThere - sumTimeBack;
  });
};

const optimal: IFilterFunction = (tickets) => {

  const maxPrice = Math.max(...tickets.map((ticket) => ticket.price));
  const maxDuration = Math.max(
    ...tickets.map((ticket) => ticket.segments[0].duration + ticket.segments[1].duration)
  );
  const maxStops = Math.max(
    ...tickets.map((ticket) => ticket.segments[0].stops.length + ticket.segments[1].stops.length)
  );

  return tickets.sort((a, b) => {
    const aScore =
      (a.price / maxPrice) * 0.4 +
      ((a.segments[0].duration + a.segments[1].duration) / maxDuration) * 0.4 +
      ((a.segments[0].stops.length + a.segments[1].stops.length) / maxStops) * 0.2;

    const bScore =
      (b.price / maxPrice) * 0.4 +
      ((b.segments[0].duration + b.segments[1].duration) / maxDuration) * 0.4 +
      ((b.segments[0].stops.length + b.segments[1].stops.length) / maxStops) * 0.2;

    return aScore - bScore;
  });
};

const options: IOptions = {
  cheap,
  fast,
  optimal,
};

export const sortToggleTickets = (
  toggleOption: keyof IOptions,
  tickets: ITickets[]
): ITickets[] => {
  return options[toggleOption](tickets);
};
