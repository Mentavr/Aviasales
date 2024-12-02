export interface IItems {
  [key: string]: IItem;
}

export interface IItem {
  label: string;
  checked: boolean;
  stop?: string | number;
}

export const filterOptions: IItems = {
  all: { label: "Все", checked: true },
  withoutTransfers: { label: "Без пересадок", stop: 0, checked: true },
  oneTransfers: { label: "1 пересадка", stop: 1, checked: true },
  twoTransfers: { label: "2 пересадки", stop: 2, checked: true },
  threeTransfers: { label: "3 пересадки", stop: 3, checked: true },
};

export const transfersOptions = {
  all: "Все",
  withoutTransfers: 0,
  oneTransfers: 1,
  twoTransfers: 2,
  threeTransfers: 3,
};
