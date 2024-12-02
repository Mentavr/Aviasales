import { format, addMinutes } from "date-fns";

export const calculateFlightTimes = (
  departureDate: string,
  flightDurationMinutes: number,
) => {
  const departure = new Date(departureDate);

  const arrival = addMinutes(departure, flightDurationMinutes);

  const formattedDeparture = format(departure, "HH:mm");
  const formattedArrival = format(arrival, "HH:mm");

  return {
    departure: formattedDeparture,
    arrival: formattedArrival,
  };
};
