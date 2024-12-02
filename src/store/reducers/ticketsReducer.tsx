import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getTickets } from "./services/apiTicketsReducer";

export interface InitialStateType {
  tickets: ITickets[];
  stop: boolean;
}

export interface ITickets {
  price: number;
  carrier: string;
  segments: ISegments[];
}

export interface ISegments {
  origin: string;
  destination: string;
  date: string;
  stops: string[];
  duration: number;
}

const initialState: InitialStateType = {
  tickets: [],
  stop: false,
};

const ticketsReducer = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getTickets.fulfilled,
      (state, action: PayloadAction<InitialStateType>) => {
        const {tickets, stop} = action.payload
        state.tickets = [...state.tickets, ...tickets];
        state.stop = stop;
      }
    );
  },
});

export const ticketsSelector = (state: { tickets: InitialStateType }) =>
  state.tickets.tickets;
export const isStopSelector = (state: { tickets: InitialStateType }) =>
  state.tickets.stop;

export default ticketsReducer.reducer;
