interface Expense {
  id: number;
  date: string;
  description: string;
  amount: number;
}

type OptionsAdd = {
  description: string;
  amount: number;
};

type OptionsDelete = {
  id: number;
};
type OptionsSummary = {
  month: number;
};
