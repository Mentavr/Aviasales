import { clientAxios } from "@/configs/apiAxiosConfig";
import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { InitialStateType } from "../ticketsReducer";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

interface ApiTicketsState {
  searchId: string;
  loadingStatus: "idle" | "loading" | "failed";
  error: SerializedError | null;
}
export const getId = createAsyncThunk("apiTickets/searchId", async () => {
  try {
    const { data } = await clientAxios("search");
    return data;
  } catch {
    toast.error("Проблемы с сетью");
  }
});

export const getTickets = createAsyncThunk(
  "apiTickets/tickets",
  async (id: string) => {
    try {
      const { data }: { data: InitialStateType} =
        await clientAxios(`tickets?searchId=${id}`);
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status !== 500) {
          toast.error("Проблемы с сетью");
        }
      }
      throw error;
    }
  }
);

const initialState: ApiTicketsState = {
  searchId: "",
  loadingStatus: "idle",
  error: null,
};

export const apiTicketsReducer = createSlice({
  name: "apiTickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getId.pending, (state) => {
        state.loadingStatus = "loading";
        state.error = null;
      })
      .addCase(getId.fulfilled, (state, action) => {
        state.searchId = action.payload.searchId;
        state.loadingStatus = "idle";
        state.error = null;
      })
      .addCase(getId.rejected, (state, action) => {
        state.loadingStatus = "failed";
        state.error = action.error;
      })

      .addCase(getTickets.pending, (state) => {
        state.loadingStatus = "loading";
        state.error = null;
      })
      .addCase(getTickets.fulfilled, (state) => {
        state.loadingStatus = "idle";
        state.error = null;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.loadingStatus = "failed";
        state.error = action.error;
      });
  },
});

export const searchSelector = (state: { apiTickets: ApiTicketsState }) =>
  state.apiTickets;

export const searchIdSelector = (state: { apiTickets: ApiTicketsState }) =>
  state.apiTickets.searchId;

export const loadingStatusSelector = (state: { apiTickets: ApiTicketsState }) =>
  state.apiTickets.loadingStatus;

export default apiTicketsReducer.reducer;
