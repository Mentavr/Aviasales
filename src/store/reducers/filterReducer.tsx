import { IItems, filterOptions } from "@/utils/constants/filterOptions";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  panelOptions: IItems;
  toggleOptions: "cheap" | "fast" | "optimal";
}

const initialState: InitialStateType = {
  panelOptions: filterOptions,
  toggleOptions: "cheap",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setOptions: (state, action: PayloadAction<keyof IItems>) => {
      const optionId = action.payload;
      let newObj = {};
      if (optionId === "all" && state.panelOptions[optionId]) {
        const allCheck = !state.panelOptions[optionId].checked;
        newObj = Object.fromEntries(
          Object.entries(state.panelOptions).map(([key, option]) => {
            return [key, { ...option, checked: allCheck }];
          }),
        );
        state.panelOptions = newObj;
      } else {
        state.panelOptions[optionId] = {
          ...state.panelOptions[optionId],
          checked: !state.panelOptions[optionId].checked,
        };
      }
      const countChecks = Object.values(state.panelOptions).reduce(
        (acc, { checked }, index) => {
          if (index === 0) {
            return acc;
          }
          return acc + (checked ? 1 : 0);
        },
        0,
      );

      if (countChecks === 4) {
        state.panelOptions["all"] = {
          ...state.panelOptions["all"],
          checked: true,
        };
      } else if (countChecks < 4 && state.panelOptions["all"].checked) {
        state.panelOptions["all"] = {
          ...state.panelOptions["all"],
          checked: false,
        };
      }
    },
    setToggleFilter: (
      state,
      action: PayloadAction<"cheap" | "fast" | "optimal">,
    ) => {
      const selectedToggle = action.payload;
      state.toggleOptions = selectedToggle;
    },
  },
});

export const { setOptions, setToggleFilter } = filterSlice.actions;
export const selectorGetOptions = (state: { filter: InitialStateType }) =>
  state.filter.panelOptions;
export const toggleFilterSelector = (state: { filter: InitialStateType }) =>
  state.filter.toggleOptions;

export const filterOptionsSelector = (state: { filter: InitialStateType }) =>
  state.filter;

export default filterSlice.reducer;
